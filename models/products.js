import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
        name:{
           type : String,
           required :[true , "requires name"],
           trim : true,
           maxLength :[120,"productname can be max 120 char"]
        },
        name:{
            type : Number,
            required :[true , "requires price"],
            maxLength :[5,"productname cannot  be more than 5 "]
        },
        description :{
            type : String,
        },
        photos:[
            {
                secure_url :{
                    type: String,
                    required : true
                }
            }
        ],
        stock:{
            type : Number,
            default :0
        },
        sold:{
            type : Number,
            default : 0
        },
        collectionId:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Collection"
        }
    },
    {
        timestamps:true
    }
);
export default mongoose.model("product",productSchema);