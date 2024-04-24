import express from 'express';
import user from '../models/user.schema'
import asynchandler from '../services/asynchandler';
import customerror from '../utils/customerror';
import mailHelper from '../utils/mailHelper';

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
export const login = asynchandler(async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new customerror('please fill all fields',400)
    }
    const User = user.findOne({email}).select("+password")
    if(!User){
        throw new customerror('invalid credentials',400)
    }
    const isPasswordMatched = await User.comparePassword(password)
    if(isPasswordMatched){
     const token = User.getjwtToken()
     User.password= undefined
    res.cookie("token",token,cookieOptions)
    return res.status(200).json({
        success : true,
        token,
        user
    })
    }
    throw new customerror('invalid ',400)
})
export const logout = asynchandler(async(_req,res)=>{
    res.cookie("token",null,{
        expires : new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})
export const forgotPassword = asynchandler(async (req,res)=>{
    const {email} = req.body
   
    const User = await user.findOne({email})
    if(!User){
        throw new customerror('user not found',400)
    }
    const resetToken = user.generateForgotPasswordToken()
    await user.save({validateBeforeSave: false})
    const resetUrl = 
    `${req.protocol}://${req.get("host")}/api/aut/password/reset/${resetToken}`
    const text = `your password reset url is
    \n\n${resetUrl}\n\n`
    try {
        await mailHelper({
            email:User.email,
            subject : "password reset email for website",
            text :text,
        })
        res.status(200).json({
            success:true,
            message : `email send to ${user.email}`
        })
    } catch (error) {
        User.forgotPasswordToken = undefined
        User.forgotPasswordExpiry = undefined
        await User.save({validateBeforeSave:false})
        throw new customerror(err.message|| 'email sent failure',500)
    }
    
        }
    );