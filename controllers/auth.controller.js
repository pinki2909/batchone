import express from 'express';
import user from '../models/user.schema'
import asynchandler from '../services/asynchandler';
import customerror from '../utils/customerror';

export const cookieOptions = {
    expires:new Date(Date.now()+3*24*60*60*1000),
    httpOnly : true,
}



export const signup = asynchandler(async (req,res)=>{
    const {name,email,password} = req.body
    if(!name ||!email||!password){
        throw new customerror('please fill all feilds',400)
    }
    const existingUser = await user.findOne({email})
    if(existingUser){
        throw new customerror('already exits',400)
    }
    const User = await user.create(
        {
            name,
            email,
            password
        }
    );
    const token = User.getjwtToken()
    console.log(User);
    User.password = undefined
    res.cookie("token",token,cookieOptions)
    res.status(200).json({
        success : true,
        token,
        user
    })
})