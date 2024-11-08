const express = require("express");
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

app.use("/user",[(req,res,next)=>{
    //  res.send("response 1")
     next()
},
(req,res,next)=>{
   // res.send("response 2")
   next()
}
,(req,res,next)=>{
    //  res.send("response 1")
     next()
},(req,res,next)=>{
    //  res.send("response 1")
     next()
},(req,res,)=>{
      res.send("response 1")
     
}])

app.listen(7777,()=>{
    console.log("The server is running on port 7777");
    
});

//ANY URL you type on internet the method is always get
//if we write an empty reqest handler then the output(response is it will hang)



