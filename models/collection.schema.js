import mongoose from "mongoose";
const collectionSchema = new mongoose.Schema(
    {
        name:{
            typr : String,
            required : [true,"please provide category"],
            trim : true,
            maxLength : [120,"collection name should not be more than 120"],

        },
    },
    {
        timestamps : true,
    }
);
export default mongoose.model("collection",collectionSchema)