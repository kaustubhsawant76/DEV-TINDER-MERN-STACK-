const express=require("express");
const {userAuth}=require("../middlewares/auth");


const profileRouter=express.Router();


profileRouter.get("/profile",userAuth,async (req,res)=>{
 try {
//    const cookies=req.cookies;

// const {token}=cookies;
// if(!token){
//   throw new Error("Invalid Token")
// }
// //Validate my token
// const decodedMessage= await jwt.verify(token,"DEV@Tinder$798")
// // console.log(decodedMessage);
// const {_id}=decodedMessage;
// console.log("Logged In User is : " + _id);

// const user= await User.findById(_id);
// if(!user){
//   throw new Error("User does not exist")
// }
const user=req.user;

  // console.log(cookies);
  res.send(user)

 } catch (error) {
  
  res.status(400).send("ERROR :" + error.message);

}
  
});

module.exports=profileRouter;