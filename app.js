import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())
//cors help in accessing 
//telling who requestiong which route-morgan
app.use(morgan('tiny'))

export default app