import mongoose from "mongoose";
import app from './app.js'
import config from "./config/index.js";

(async ()=>{
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.log("DB CONNECTED");
        app.on("Error",(error)=>{
            console.log("error:",error);
            throw error;
        })
        const onListening =() =>{
            console.log(`Listening on ${config.PORT}`) ;
        }
        app.listen(config.PORT,onListening)
    } catch (error) {
    console.log("Error",error);
    throw error
    }
})()
