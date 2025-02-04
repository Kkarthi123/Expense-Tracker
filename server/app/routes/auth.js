const express = require("express");
const User = require("../models/userModel");
const generateToken = require("../helper/tokenGenerator");
const jwt = require("jsonwebtoken");
const axios = require("axios")

const AuthRouter = express.Router();

AuthRouter.post("/signUp", async(req,res)=>{
    
    const {name, email, password} = req.body;

    const isUserExist = await User.findOne({email});

    if(isUserExist){
        res.status(400).json({
            message: "User Already Exist"
        })
    }else{
        const newUser = new User({
            name,
            email,
            password,
        })

        await newUser.save();

        res.cookie('authToken', generateToken(newUser._id), {
            secure: true, 
            maxAge: 3600000, 
        });

        res.json({
            name,
            email,
        })

    }
});


AuthRouter.post("/signIn", async(req,res)=>{

    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && await user.validatePassword(password)){

        res.cookie('authToken', generateToken(user._id), {
            secure: true, 
            maxAge: 3600000, 
        });

        res.json({
            email,
            name: user.name,
            profilePicture: user.profilePicture,
        })

    }else{
        res.status(400).json({message: "Invalid Email or Password"})
    }
})

AuthRouter.post("/oAuthLogin", async(req,res)=>{
    const {token} = req.body;
    const { data:{sub, email, name, picture} } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {headers: {Authorization: `Bearer ${token.access_token}`}});;

    try {
        const isUserExist = await User.findOne({email});
        if(isUserExist){
            res.cookie('authToken', generateToken(isUserExist._id), { 
                secure: true, 
                maxAge: 3600000, 
            });

            res.json({
                email,
                name: isUserExist.name,
                profilePicture: isUserExist.profilePicture,
            })

        }else{
            const newUser = new User({
                email,
                name,
                oauthProvider: true,
                oauthId: sub,
                profilePicture: picture,
            })
            await newUser.save();

            res.cookie('authToken', generateToken(newUser._id), {
                secure: true, 
                maxAge: 3600000, 
            });

            res.json({
                email,
                name: newUser.name,
                profilePicture: newUser.profilePicture,
            })
    }
    } catch (error) {
        res.status(400).json({message: "Unexpected Error Occured. Not able to Login"})
    }

})



module.exports = AuthRouter;
