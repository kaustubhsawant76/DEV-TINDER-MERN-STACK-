const express=require("express");
const {userAuth}=require("../middlewares/auth");

const requestRouter=express.Router();

requestRouter.post("/sendConnectionRequest",userAuth,(req,res)=>{

  const user=req.user;
  //Sending a connection request
  console.log("Sending a Connection Request");
  
  res.send(user.firstName  + "sent the connection request !");
});

module.exports=requestRouter;
