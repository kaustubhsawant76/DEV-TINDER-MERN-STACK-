const adminAuth=(req,res,next) => {
    const token="xyz"
    const isUserAuthorized = token === "xyz";
    if(!isUserAuthorized){
       res.status(401).send("you are un authorized")
    } else {
       next();
    }
 };


 const userAuth=(req,res,next) => {
    const token="xyz"
    const isUserAuthorized = token === "xyz";
    if(!isUserAuthorized){
       res.status(401).send("you are un authorized")
    } else {
       next();
    }
 };

 module.exports={
    adminAuth,
    userAuth
 };