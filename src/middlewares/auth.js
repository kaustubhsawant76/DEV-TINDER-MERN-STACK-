const jwt=require("jsonwebtoken");
const User =require("../models/user")

// const adminAuth=(req,res,next) => {
//     const token="xyz"
//     const isUserAuthorized = token === "xyz";
//     if(!isUserAuthorized){
//        res.status(401).send("you are un authorized")
//     } else {
//        next();
//     }
//  };


//  const userAuth=(req,res,next) => {
//     const token="xyz"
//     const isUserAuthorized = token === "xyz";
//     if(!isUserAuthorized){
//        res.status(401).send("you are un authorized")
//     } else {
//        next();
//     }
//  };

const userAuth=async (req,res,next) => {
 try {
   const {token}=req.cookies;
   if(!token){
      throw new Error("Token is not valid !!!!!")
   }
   const decodeObj= await jwt.verify(token,"DEV@Tinder$798")

const {_id}=decodeObj;
const user=await User.findById(_id);
if(!user){
   throw new Error("User not Found")
}
req.user=user;

next();

 } catch (error) {
   res.status(400).send("Error :" + error.message);
 }

 };


 module.exports={
    
    userAuth
 };