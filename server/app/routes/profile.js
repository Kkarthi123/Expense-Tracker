const express = require('express');
const User = require('../models/userModel');

const ProfileRouter = express.Router();

ProfileRouter.get("/", async(req,res)=>{
    try{
        const profile = await User.findById(req.body.userId);
        res.status(200).json({profile})
    }catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
});


module.exports = ProfileRouter;