const express = require("express");
const app= express();

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


