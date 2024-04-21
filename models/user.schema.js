import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";
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
export default moongoose.model("user" ,userSchema)