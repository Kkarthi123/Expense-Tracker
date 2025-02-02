const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authHandler = async(req, res, next)=>{
    let token = req.cookies["authToken"];
    if(token){
        try {
            let decodedString = jwt.decode(token, process.env.SECRET_KEY);
            let userData = await User.findById(decodedString.id).select("-password");
            req.body["userId"] = userData._id;
            next()
            
        } catch (error) {
             res.status(400).json({
                message: "token failed"
            });
        }
    }else{
        res.status(400).json({
            message: "token not found"
        });
    }
}

module.exports = authHandler;