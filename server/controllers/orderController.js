import { response } from "express";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import stripe from "stripe"

//Place order Cash on Delivery : api/order/cod
export const placeOrderCOD=async (req,res)=>{
    try {
        const {userId}=req;
        const {items,address}=req.body;
        if(!address || items.length ===0){
            return res.json({success:false,message:"Invalid Data"})
        }
        //Calculate Amount using Items
        const amount=await items.reduce(async (acc,item)=>{
            const product=await Product.findById(item.product);  //it should be product.id
            return (await acc) +  product.offerPrice *item.quantity
        },0)

        await Order.create({
            userId,items,amount,address,paymentType:"COD"
        })
        return res.json({success:true,message:"Order Placed Successfully"})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})     
    }
}

//Place order Stripe on Delivery : api/order/stripe

export const placeOrderStripe=async (req,res)=>{
    try {
        const {userId}=req;
        const {items,address}=req.body;
        const {origin}=req.headers;

        if(!address || items.length ===0){
            return res.json({success:false,message:"Invalid Data"})
        }

        let productData=[]
        //Calculate Amount using Items
        let amount=await items.reduce(async (acc,item)=>{
            const product=await Product.findById(item.product);  //in cart.jsx in req attaching ->product:item._id
            productData.push({
                name:product.name,
                price:product.offerPrice,
                quantity:item.quantity
            })
            return (await acc) +  product.offerPrice *item.quantity
        },0)
        //Add tax Charge (2%)
        amount+=Math.floor(amount *0.02)

        const order=await Order.create({
            userId,items,amount,address,paymentType:"Online"
        })

        //stripe Gateway Initialize
        const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY)

        // Create line items for stripe
        const line_items=productData.map((item)=>{
            return{
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:(item.price + item.price *0.02)  *100
                },
                quantity:item.quantity,
            }
        }) 

        //create Session
        const session =await  stripeInstance.checkout.sessions.create({
            line_items,
            mode:"payment",
            success_url:`${origin}/loader?next=my-orders`, //frontENd url
            cancel_url:`${origin}/cart`,
            metadata:{
                orderId:order._id.toString(),
                userId
            }

        })

        return res.json({success:true,url:session.url}) //either success ur or cancel url in .url
    } 
    catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})     
    }
}

// Stripe Web Hooks to verify payment  Action :/stripe
export const stripeWebHooks=async (request,response)=>  {
    console.log("🔥 STRIPE WEBHOOK HIT");
    // Stripe Gateway Initialize
    const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);

    const signature=request.headers["stripe-signature"]
    let event;
    try {
        event =stripeInstance.webhooks.constructEvent(
            request.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        response.json(400).send(`WebHook Error: ${error.message}`)
    }
    console.log("EVENT HIT",event)
    // Handle the event (in try block there)
    switch (event.type) {
        case "payment_intent.succeeded":{
            const paymentIntent=event.data.object;
            const paymentIntentId=paymentIntent.id;

            //Getting session Metadata
            const session=await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId,
            })
            const {orderId,userId}=session.data[0].metadata;
            // Mark payment as paid
            await Order.findByIdAndUpdate(orderId,{isPaid:true})
            // CLear user cart
            await User.findByIdAndUpdate(userId,{cartItems:{}})
            break;
        }
         case "payment_intent.payment_failed":{
            const paymentIntent=event.data.object;
            const paymentIntentId=paymentIntent.id;

            //Getting session Metadata
            const session=await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId,
            })
            const {orderId}=session.data[0].metadata;
            await Order.findByIdAndDelete(orderId)
            break
         }
    
        default:
            console.log(`Uhandled Event Type ${event.type}`)
            break;
    }
    response.status(200).json({recieved:true})
}
//     export const stripeWebHooks = async (request, response) => {
//         console.log("🔥 STRIPE WEBHOOK HIT");

//   const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
//   const signature = request.headers["stripe-signature"];

//   let event;

//   try {
//     event = stripeInstance.webhooks.constructEvent(
//       request.body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (error) {
//     return response.status(400).send(`Webhook Error: ${error.message}`);
//   }
//   console.log("Event:", event.type);
//   // ✅ ONLY THIS EVENT
//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     const { orderId, userId } = session.metadata;

//     await Order.findByIdAndUpdate(orderId, { isPaid: true });
//     await User.findByIdAndUpdate(userId, { cartItems: {} });
//   }

//   response.status(200).json({ received: true });
// };



//Get Orders by UserId  : /api/order/user

export const getUserOrders=async (req,res)=>{
    try {
        const {userId}=req;
        const orders=await Order.find({
            userId,
            $or:[{paymentType:"COD"}, {isPaid:true}]  //any of these true it 
        }).populate("items.product address").sort({createdAt:-1})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})            
    }
}    

//Get All Order for (seller/admin)  :/api/order/seller
export const getAllOrders=async (req,res)=>{
    try {
        const orders=await Order.find({
            $or:[{paymentType:"COD"}, {isPaid:true}]  //any of these true it 
        }).populate("items.product address").sort({createdAt:-1})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})            
    }
}    