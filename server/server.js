import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import { connect } from 'mongoose';
import connectDB from './configs/db.js';
import 'dotenv/config'; //in db.js using environemnt variable for mongodburi 
import userRouter from './routes/userRouter.js';

const app=express();

await connectDB()

//Origin Allowed  //req from these origin can get response from the server
const allowedOrigin=['http://localhost:5173']

//Middleware Configurations
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:allowedOrigin , credentials:true}))

app.get('/',(req,res)=>{
    res.send("WELCOME Express Server")  
})

app.use('/api/user',userRouter)



app.listen(4000,()=>{
    console.log("APP running on port number 4000")
})