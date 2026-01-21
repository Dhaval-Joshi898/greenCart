import User from "../models/User.js"

// Update User Cart data : api/cart/update
export const updateCart=async (req,res)=>{
    try {
        const {userId}=req
        const {cartItems}=req.body
        await User.findByIdAndUpdate(userId,{cartItems}) //update cartItems
        res.json({success:true,message:"Cart Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}