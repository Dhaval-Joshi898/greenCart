import mongoose from "mongoose";

const connectDB=async ()=>{
    try{
        //event listener are attached before connection starts
        mongoose.connection.on('connected',()=>{
            console.log("DATABASE CONNECTED")
        })
        await mongoose.connect(`${process.env.MONGODB_URI}freshCart`)
    }catch(error){
        console.log(error.message)
    }
}


export default connectDB;