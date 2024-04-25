import product from "../models/products"
import formidable from "formidable"
import fs from "fs"
import {s3FileUpload,deleteFile} from "../services/imageuploader"
import Mongoose  from "mongoose"
import asynchandler from "../services/imageuploader"
import customerror from "../utils/customerror"
import config from "../config/index"
import { error } from "console"
export const addProduct = asynchandler(async(req,res)=>{
    const form = formidable({
        multiples:true,
        keepExtensions:true
    });
    form.parse(req,async function(err,fields,files){
        try {
            if(err){
                throw new customerror(err.message||"somting went wrong",500)
            }
            let productId = new Mongoose.Types.ObjectId().toHexString();//unique
             if(!fields.name||!fields.price||!fields.description||!fields.collectionId){
                throw new customerror("please fill all details",500)
             }
              
             let imgArrayResp = await Promise.all(
                Object.keys(files).map(async (filekey,index)=>{
                    const element = files[filekey]
                    
                   const data =  fs.readFileSync(element.filepath)
                 
                   const upload = await s3FileUpload({
                    bucketName : config.S3_BUCKET_NAME,
                    key:`products/${productId}/photo_${index+1}.png`,
                    body : data,
                    contentType : element.mimetype
                    //png , jpg mimetype
                   })
                   return{
                    secure_url : upload.Location
                   }
                })
             )
              
          let imgArray = await imgArrayResp;
          const product = await Product.create({
            _id : productId,
            photos : imgArray,
            ...fields,
          })
          if(!product){
            throw new customerror("product was not created",400)
          }
          res.status(200).json({
            success:true,
            product
          })

        } catch (error) {
            res.status(500).json({
                success:false,
                message: error.message|| "somthing went wrong"
              })
        }
    })
})
export const getAllProducts = asynchandler(async(req,res)=>{
    const products = await Product.find({})
          if(!products){
            throw new customerror("product was not found",404)
          }
          res.status(200).json({
            success:true,
            products
          })
 }) 
 export const getProductById = asynchandler(async(req,res)=>{
    const {id:productId} = req.params
    const product = await Product.findById({})
          if(!product){
            throw new customerror("product was not found",404)
          }
          res.status(200).json({
            success:true,
            product
          })
 })      


