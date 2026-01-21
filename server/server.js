import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import { connect } from 'mongoose';
import connectDB from './configs/db.js';
import 'dotenv/config'; //in db.js using environemnt variable for mongodburi 
// import userRouter from './routes/userRoute';
import sellerRouter from './routes/sellerRoute.js';
import userRouter from './routes/userRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebHooks } from './controllers/orderController.js';

const app=express();

await connectDB()
await connectCloudinary()


//Origin Allowed  //req from these origin can get response from the server
const allowedOrigin=['http://localhost:5173',"https://green-cart-nine-rho.vercel.app"]

app.post('/stripe',express.raw({type:'application/json'}), stripeWebHooks)

//Middleware Configurations
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:allowedOrigin , credentials:true}))

app.get('/',(req,res)=>{
    res.send("WELCOME Express Server")  
})

app.use('/api/user',userRouter)
app.use('/api/seller',sellerRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/orders',orderRouter)



app.listen(4000,()=>{
    console.log("APP running on port number 4000")
})