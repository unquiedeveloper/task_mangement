import mongoose from "mongoose"
import validator from "validator"
import bcrpyt from "bcryptjs"
import jwt from "jsonwebtoken"


const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Plz provide your name!1"],
        minLength:[3, "name must contain atleast 3char"],
        maxLength:[30 , "name cant exteed 30 char"],
    },
    email:{
        type:String,
        required:[true, "Plz provide your email"],
        unique:[true,"user already registered!1"],
        validate: [validator.isEmail, "PLx provide valid email"]
    },
    phone:{

        type:Number,
        required:[true, "Plz provide your phone"],
    },
    password:{
        type:String,
        required:[true, "Plz provide your password"],
        minLength:[8, "password must contain atleast 8char"],
        maxLength:[33 , "passwordcant exteed 33 char"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true
        }
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }



})

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrpyt.hash(this.password,10);
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrpyt.compare(enteredPassword, this.password);
}

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
    });
}

export const User = mongoose.model("User",userSchema);