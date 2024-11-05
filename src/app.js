const express = require("express");
const app= express();


// app.use("/user", (req,res) => {
    
//     res.send("ORDER MATTERS");
   
// });


//This will handle only get call to user
app.get("/user", (req,res) => {
    res.send({firstname:"Kaustubh" , lastname:"Sawant"});
   
});


app.post("/user", (req,res) => {
    //Saving data to DB
    res.send("Data succesfully save dto Database");
   
});

app.delete("/user", (req,res) => {
    
    res.send("Deleted successfuully");
   
});

 //always write bigger same routes first
app.use("/hello/2", (req,res) => {
    res.send("hello 2 2 2 2 2  2 2 2");
    
});

app.use("/hello", (req,res) => {
    res.send("hello hello hello");
    
});

//request handler
app.use("/test",(req,res) => {
    res.send("hi from the server");
    
});

app.use("/", (req,res) => {
    res.send("hi this is dashboard");
   
});

app.listen(7777,()=>{
    console.log("The server is running on port 7777");
    
});

//ANY URL youtype on internet the method is always get


