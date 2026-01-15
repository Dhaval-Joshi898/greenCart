import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//Sign Up user :API --> /api/user/signup
export const register= async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        //if any of data not there
        if(!name || !email || !password){
            return res.json({success:false,message:"Missing Details "})
        }

        const existingUser=await User.findOne({email})

        if(existingUser){
            return res.json({success:false,message:"User already exist with the given Email ID"})
        }

        //Encrypting password then storing to DB
        const hashedPassword=await bcrypt.hash(password,10)

        //creating user data (document)
        const user =await User.create({name:name,email:email,password:hashedPassword})

        //creating token send with the response attached to cookies
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})

        res.cookie('token',token,{
            httpOnly:true, //prevent Javascript to access the cookie
            secure:process.env.NODE_ENV === "production", //used secured cookie in production
            sameSite:process.env.NODE_ENV === "production" ? "none" : "strict", //csrf protection
            maxAge:7 *24 *60 *60 *1000
        })
        
        //sending reponse to frontend OR user
        return  res.json({success:true,user:{name:user.name, email: user.email}})
        
    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
    
    
}


//Login User : /api/user/login

export const login=async (req,res)=>{
    try {
        const {email,password}=req.body

        if(!email || !password) return res.json({success:false,message:"Email and Password are required"})

        
    } catch (error) {
        
    }
}