import asynchandler from "../services/asynchandler"
import customerror from "../utils/customerror"
import jwt from 'jsonwebtoken'
import user from  '../models/user.schema'
import config from "../config/index.js"

export const isLoggedIn = asynchandler(async(req,res,next)=>{
    let token;
    if(
        req.cookie.token ||
        (req.headers.authorization && req.headers.authorization.startswith("Bearer"))
    ){
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }
if(!token){
    throw  new customerror("not authorized",401)
}
try {
    const decodedjwtPayload = jwt.verify(token,config.jwt_SECRET)
    req.User = awit user.findById(decodedjwtPayload._id, "name email role")
    next()
    
} catch (error) {
    throw new customerror('not authorized to access',401)
}

}) 