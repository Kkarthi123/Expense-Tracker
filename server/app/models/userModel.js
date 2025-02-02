const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    password:{
        type: String,
        required: function(){
            return !this.oauthProvider
        },
        minlength: 6,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    profilePicture: {
        type: String,
        default: null
    },
    oauthProvider: {
        type: String, 
        default: false,
    },
    oauthId: {
        type: String,
        default: null,
    }
},
{
    timestamps: true,
})


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    let salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
});


userSchema.methods.validatePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = User;