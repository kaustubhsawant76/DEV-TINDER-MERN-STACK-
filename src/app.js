const express = require("express");
const connectDB= require("./config/database");



const cookieParser = require("cookie-parser");


const user = require("./models/user");


const app= express();



// app.use("/user", (req,res) => {
    
//     res.send("ORDER MATTERS");
   
// });

//write as many as b's you want between a and c
// app.get("/ab+c", (req,res) => {
//     res.send({firstname:"Kaustubh" , lastname:"Sawant"});
   
// });

// means b is optional
// app.get("/ab?c", (req,res) => {
//     res.send({firstname:"Kaustubh" , lastname:"Sawant"});
   
// });

 //write anything between ab and c
// app.get("/ab*c", (req,res) => {
//     res.send({firstname:"Kaustubh" , lastname:"Sawant"});
   
// });

//REGEX ALSO WORKS MEANS ANYTHING THAT STARTS WITH a 
// app.get(/a/, (req,res) => {
//     res.send({firstname:"Kaustubh" , lastname:"Sawant"});
   
// });

//REGEX ALSO WORKS, MEANS ANYTHING THAT ENDS WITH FLY 
// app.get(/.*fly$/, (req,res) => {
//     res.send({firstname:"Kaustubh" , lastname:"Sawant"});
   
// });


// means bc are grouprd and bc is optional similarly we can do bc++ so we can write route /"abcbcbcbcbcd"
// app.get("/a(bc)?d", (req,res) => {
//     res.send({firstname:"Kaustubh" , lastname:"Sawant"});
   
// });

//This will handle only get call to user
// app.get("/user", (req,res) => {
   //will give userid and password entered in postman and we can add more by &
//     console.log(req.query);
    
//     res.send({firstname:"Kaustubh" , lastname:"Sawant"});
   
// });

//: means dynamic route
// app.get("/user/:userId", (req,res) => {
//     console.log(req.params);
    
//     res.send({firstname:"Kaustubh" , lastname:"Sawant"});
   
// });

// app.get("/user/:userId/:name/:password", (req,res) => {
//     console.log(req.params);
    
//     res.send({firstname:"Kaustubh" , lastname:"Sawant"});
   
// });


// app.post("/user", (req,res) => {
     //Saving data to DB
//     res.send("Data succesfully save dto Database");
   
// });

// app.delete("/user", (req,res) => {
    
//     res.send("Deleted successfuully");
   
// });

//  //always write bigger same routes first
// app.use("/hello/2", (req,res) => {
//     res.send("hello 2 2 2 2 2  2 2 2");
    
// });

// app.use("/hello", (req,res) => {
//     res.send("hello hello hello");
    
// });

//request handler
// app.use("/test",(req,res) => {
//     res.send("hi from the server");
    
// });

// app.use("/", (req,res) => {
//     res.send("hi this is dashboard");
   
// });

//CONCLUSION OF MULTIPLE ROUTE HANDLERS  CODE BELOW
//app.use("/route",rH1,[rH2,rH3],rH4,rH5)
//app.use("/route",[rH1,rH2,rH3,rH4,rH5])

// app.use("/user",[(req,res,next)=>{
//     //  res.send("response 1")
//      next()
// },
//THESE FUNCTIONS IN MIDDLE ARE KNOWN AS MIDDLEWARE
// (req,res,next)=>{
//    // res.send("response 2")
//    next()
// }
// ,(req,res,next)=>{
//     //  res.send("response 1")
//      next()
// },(req,res,next)=>{
//     //  res.send("response 1")
//      next()
// },(req,res,)=>{
//       res.send("response 1")
     
// }])

//can be also written as two independent route handlers
//GET/Users => Middlewear chain => Request Handler

// app.use("/user",(req,res,next)=>{
//     //  res.send("response 1")
//      next()
// })

// app.use("/user",(req,res)=>{
//       res.send("response 1")
     
// })


//if we donot use middle wear we have to write code like following
// app.get("/admin/getAllData",(req,res)=>{
//     //Logic of checking if the user is authorized or not
//     const token="xyz"
//      const isUserAuthorized = token === "xyz";
//      if(isUserAuthorized){
//         res.send("All data send")
//      } 
//      else
//      {
//         res.status(401).send("you are un authorized")
//      }
   
// })

// app.get("/admin/deleteUser",(req,res)=>{
//      //Logic of checking if the user is authorized or not
//      const token="xyzf"
//      const isUserAuthorized = token === "xyz";
//      if(isUserAuthorized){
//         res.send("Deleted a user")
//      } 
//      else
//      {
//         res.status(401).send("you are un authorized")
//      }
    
// })

///admin middlewear will be called only when you use/admin 
// const {adminAuth,userAuth}=require("./middlewares/auth");
// app.use("/admin",adminAuth)


// app.get("/user",userAuth,(req,res)=>{
//    res.send("User Data Sent");
// });

// app.get("/admin/getAllData",(req,res)=>{
//    //Logic of checking if the user is authorized or not
//        res.send("All data send");
    
// });

// app.get("/admin/deleteUser",(req,res)=>{
//     //Logic of checking if the user is authorized or not
//     res.send("Deleted a user");
// })

// app.get("/getUserData",(req,res) => {

//    throw new Error("hfhhfhg");
//    res.send("User Data Send")
// });

//TRY-CATCH method is used to catch any error

//This error catching method works universally
// app.use("/",(err,req,res,next) => {
//    if (err) {
//     res.status(500).send("something went wrong")  
//    }
// })

app.use(express.json());

app.use(cookieParser());

const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")
const requestRouter=require("./routes/request")

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);






// app.get("/user",async (req,res)=>{
//    const userEmail=req.body.emailId; 
//    try {
//     const user=await User.findOne({emailId:userEmail})
//     if(user.length ===0)
//     {
//       res.status(404).send("User not found")
//     }
//     else{
//       res.send(user)
//     }
    
 
//    } catch (error) {
//     res.status(400).send("Something Went Wrong")
//    }
    
//  })
 
//  app.get("/feed",async(req,res)=>{

//    try {
//       const user=await User.find({})
//       if(user.length ===0)
//       {
//         res.status(404).send("User not found")
//       }
//       else{
//         res.send(user)
//       }
      
   
//      } catch (error) {
//       res.status(400).send("Something Went Wrong")
//      }

//  })

//  app.delete("/user",async(req,res)=>{
//    const userId=req.body.userId
//    try {
//       // const user=await User.findByIdAndDelete(userId)
//       const user=await User.findByIdAndDelete({_id:userId})
      
//       res.send("User Deleted Succesfully")
   
//      } catch (error) {
//       res.status(400).send("Something Went Wrong")
//      }
// } )

//  app.patch("/user/:userId",async(req,res)=>{
//   const userId=req.params?.userId;
//   //  const userId=req.body.userId;
//    const data=req.body;
//    try {
//     const ALLOWED_UPDATES=[
//       "photoUrl",
//       "about",
//       "firstName",
//       "lastName",
//       "gender",
//       "age",
//       "skills",
//     ];
//     const isUpdateAllowed=Object.keys(data).every((k)=>
//     ALLOWED_UPDATES.includes(k)
//   );
//   if(!isUpdateAllowed){
//     throw new Error("Update not allowed")
//   }
//   if(data?.skills.length > 10){
//     throw new Error("Skills cannot be more than 10")
//   }
//       // const user=await User.findByIdAndDelete(userId)
//       const user=await User.findByIdAndUpdate({_id:userId},data,{
//          returnDocument:"before",
//          runValidators:true,
//       })
      
//       console.log(user);
      
//       res.send("Upadated Succesfully")
   
//      } catch (error) {
//       res.status(400).send("UPDATE FAILED:" + error.message)
//      }
// } )

connectDB()
.then(()=>{
    console.log("Database connection established ...");
    app.listen(7777,()=>{
      console.log("The server is running on port 7777");
      
  });
  

    })
    .catch((err)=>{
        console.error("Database cannot be connected!!");
        
    });




//ANY URL you type on internet the method is always get
//if we write an empty reqest handler then the output(response is it will hang)



