const express=require("express");
const{validateSignUpData}=require("../utils/validation")
const User = require("../models/user");
const bcrypt=require("bcrypt");
//const jwt=require("jsonwebtoken"); not needed since we made method
const authRouter=express.Router();


authRouter.post("/signup",async(req,res)=>{

  try {
  // console.log(req.body)
   // const user=new User({
   //  firstName:"MS",
   //  lastName:"Dhoni",
   //  emailId:"dhoni53@gmail.com",
   //  password:"dhonibhai"
   // })
//1)Validation of data
validateSignUpData(req);

//2)Encrypt the password
const{firstName,lastName,emailId,password}=req.body;
const passwordHash= await bcrypt.hash(password,10)
console.log(passwordHash);


//Creating a new instance of the User Model
   const user=new User({
    firstName,
    lastName,
    emailId,
    password:passwordHash,
   })


   await user.save()

   res.send("Data saved succesfully") 
} catch (error) {
   res.status(400).send("Error :" + error.message);
}

   

});

authRouter.post("/login",async (req,res)=>{

try {
  const {password,emailId}=req.body;

  const user= await User.findOne({emailId:emailId});

  if(!user){
    throw new Error("Invalid Credentials");
  }

  const isPasswordValid = await user.validatePassword(password);
  if(isPasswordValid){

    //Create a JWT Token
const token= await user.getJWT(); 

    //Add the token to cookie and send the response back to the user
  res.cookie("token",token,{
    expires:new Date(Date.now() +8 * 3600000),
  });
    res.send("Login Succesful !!!");
  }
  else{
    throw new Error("Invalid Credentials")
  }

} catch (error) {
  
  res.status(400).send("ERROR :" + error.message);

}

});

authRouter.post("/logout",async (req,res) => {

res.cookie("token",null, 
  {expires: new Date(Date.now()),
});
res.send("Logout Succesful");

});

module.exports=authRouter;