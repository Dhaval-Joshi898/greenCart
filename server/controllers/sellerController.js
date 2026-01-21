import jwt from "jsonwebtoken"

// Seller Login  : api/seller/login

export const sellerLogin = async (req,res)=>{
    try {
    const {email,password}=req.body;

    if(password ===process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){

        //creating token send with the response attached to cookies
        const token=jwt.sign({email},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
        
        res.cookie('sellerToken',token,{
            httpOnly:true, 
            secure:process.env.NODE_ENV === "production", //used secured cookie in production
            sameSite:process.env.NODE_ENV === "production" ? "none" : "strict", 
            maxAge:7 *24 *60 *60 *1000
        })

        return res.json({success:true,message:"Seller Logged in"})
    }
    else{
        return res.json({success:false,message:"Invalid Credential"})
    }
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.meesage})
    }
}

// Seller is authorized : api/seller/is-auth
export const isSellerAuth=async (req,res)=>{
    try{
        return res.json({success:true})  //seller loggedin return true
    }
    catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
    }  
}

// Logout Seller : api/seller/logout
export const sellerLogout=async (req,res)=>{
    try {
        res.clearCookie('sellerToken',{
            httpOnly:true,
            secure:process.env.NODE_ENV,
            sameSite:process.env.NODE_ENV  ==="production"  ?"none" : "strict"
        })
        return res.json({success:true,message:"Seller Logged Out"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}