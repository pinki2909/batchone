import collectionSchema from "../models/collection.schema";
import customerror from "../utils/customerror";
import asynchandler from "../services/asynchandler";
import { Collection } from "mongoose";

export const createCollection = asynchandler(async(req,res)=>{
    const {name} = req.body;
    if(!name){
        throw new customerror("name is not found ",400);
    }
    const collection = await Collection.createIndex({
        name
    })
    res.status(200).json({
      success : true,
      message : "collection create with database",
      collection
    })
})
export const updateCollection = asynchandler(async(req,res)=>{
    const{id : collectionID} = req.params
     const{name} = req.body
     if(!name){
        throw new customerror("name is not found ",400);
    }
    let updatecollection = await Collection.findByIdANDUPDATE(
        collectionID, 
        { name},
        {
            new:true,
            runValidators : true
        }
    )
if(!updatecollection){
    throw new customerror("collection is not found ",400);
}
res.status(200).json({
    success:true,
    message:"collection updated with success",
    updateCollection
})

})
export const deleteCollection = asynchandler(async(req,res)=>{
    const{id : collectionID} = req.params
    const collectionToDelete = await Collection.findBYIdAndDelete(collectionID)
    if(!collectionToDelete){
        throw new customerror("collection is not found ",400);
    }
    res.status(200).json({
        success:true,
        message:"collection delete with success",
        collectionToDelete
    })
})

export const getAllCollection = asynchandler(async(req,res)=>{
   const collection =  await Collection.find()
   if(!collection){
    throw new customerror("not collection found",400)
   }
   res.status(200).json({
      success:true,
      message:"collection created with success",
      collection
   })
})



