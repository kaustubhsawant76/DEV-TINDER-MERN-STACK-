const express = require("express");
const userRouter = express.Router();
const {userAuth}=require("../middlewares/auth")
const ConnectionRequest=require("../models/connectionRequest")

//Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try {
       const loggedInUser = req.user;

   const connectionRequests= await ConnectionRequest.find({
    toUserId:loggedInUser._id,
//    }).populate("fromUserId",["firstName","lastName"]);
 }).populate("fromUserId","firstName lastName photoUrl age gender about skills");

   res.json({
    message:"Data Fetched Successfully",
    data:connectionRequests,
   })

    } catch (error) {
       req.statusCode(400).send("ERROR: " + error.message) ;
    }
})



module.exports=userRouter;