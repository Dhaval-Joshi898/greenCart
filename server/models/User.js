import mongoose from "mongoose";

// Creating User Schema (how user should look lie)
const userSchema= new  mongoose.Schema({
    name:{type:String ,required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    cartItems:{type:Object, default:{}},
},{minimize:false})  //minimize:false added so that i can default empty object

//Creating User Model (it is created using schema) 
// (this needed to talk to DB and do CRUD )
const User=mongoose.models.user || mongoose.model('user',userSchema)

export default User;