import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
    {
       products :{
          types:[
            {
                productId :{
                    type : mongoose.Schema.Types.ObjectId,
                    ref : "product",
                    required : true
                },
                count : Number,
                price :Number
            }
          ],
          requires : true
       
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    address:{
        type : String,
        required:true
    },
    phoneNumber:{
        type : Number,
        required:true
    },
    amount:{
        type : Number,
        required:true
    },
    coupon:String,
    transectionId:String,
    status :{
        type : String,
        enum:["ORDERED","SHIPPED","DELIVERED","CANCELLED"],
        default:"ORDERED",
    },
},
    {
        timestamps : true
    }
)
export default mongoose.model("order",orderSchema)