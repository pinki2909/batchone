import mongoose from "mongoose";
const userSchema = mongoose.Schema(
    {
        name:{
            type : String,
            required : [true , "name is requird"],
            maxLength : [50 , "name must be less than 50"]
        }
    }
)