import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";
import jwt from "jsonwebtoken";
import collectionSchema from "./collection.schema";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import config from "../config/index";
const userSchema = mongoose.Schema(
    {
        name:{
            type : String,
            required : [true , "name is requird"],
            maxLength : [50 , "name must be less than 50"]
        },
        email:{
            type : String,
            required : [true , "email is requird"],
           unique : true
        },
        password:{
            type : String,
            required : [true , "password is requird"],
            minLength : [5 , "password must be atleast of 5 character"],
            select : false
        },
        role:{
            type : String,
            enum : Object.values(AuthRoles),
            default : AuthRoles.USER
        },
        forgotPasswordToken:String,
        forgotPasswordExpiry : Date , 
    },
    {
        timestamps : true
    }
);
userSchema.pre("save", async function(next){
    if(!this.ismodified("password"))return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})
userSchema.mathods = {
    comparePassword : async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password) 
    },
    getjwtToken : function(){
        return jwt.sign(
            {
                _id:this.id,
                role : this.role
            },
            config.jwt_SECRET,
            {
               expiresIn : config.jwt_EXPIRY
            }
        )
    },
    generateforgotPasswordToken : function(){
        const forgotToken = crypto.randomBytes(10).toString('hex');
        this.forgotPasswordToken = crypto
        .createHash("sha256")
        .update(forgotToken)
        .digest("hex")
        this.forgotPasswordExpiry = Date.now()+20 *60 *1000
        return forgotToken;
    }
}

export default moongoose.model("user" ,userSchema)