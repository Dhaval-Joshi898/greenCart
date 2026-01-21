import jwt from "jsonwebtoken";

const authUser=async (req,res,next)=>{
    const {token} =req.cookies;
    // console.log("TOKEN",token)

    if(!token){
        return res.json({success:false,message:"Not Authorized"})
    }

    try {
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET_KEY) //to get id
        if(tokenDecode.id){
            req.userId = tokenDecode.id;
            // req.body.userId=tokenDecode.id; //adding the user id in req body so it will be there for every req
        }
        else{
            return res.json({success:false,message:"Not Authorized"})
        }
        next();
    }
    catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }   
}
export default authUser;