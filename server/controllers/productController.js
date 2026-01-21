import {v2 as cloudinary} from "cloudinary"
import Product from "../models/Product.js";

// Add Product  : api/product/add
export const addProduct=async (req,res)=>{
    console.log("ADD PRODUCT HIT")
    try {
        //  console.log("BODY PRODUCT CONTROLLER:", req.body);
        // console.log("FILES PRODUCT CONTROLLER:", req.files);
        let productData=JSON.parse(req.body.productData);

        const images=req.files;

        let imagesUrl=await Promise.all(
            images.map(async (image)=>{
                let result= await cloudinary.uploader.upload(image.path,{resource_type:'image'});

                // console.log("CLOUDINARY result",result)
                return result.secure_url;
            })
        )

        await Product.create({...productData,images:imagesUrl}) //...(spread used for unpacking productData means it is object is not spread then {object2:{productData{}})

        res.json({success:true,message:"Product Added"})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}


// Get Product  : api/product/list
export const productList=async (req,res)=>{
    try {
        const products=await Product.find({})  //empty object will return all the product
        res.json({success:true,products})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

// Get single  Product  : api/product/id
export const productById=async (req,res)=>{
    try {
        const {id}=req.body
        const product=await Product.findById(id)
        res.json({success:true,product})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}


// Change product inStock : api/product/stock
export const changeStock=async (req,res)=>{
    try {
        const {id,inStock}=req.body;
        await Product.findByIdAndUpdate(id,{inStock});
        res.json({success:true,message:"Stock Updated"})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

