const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
firstName:{
    type:String,
    required:true,
    minLength:4,
    maxLength:50,


},
lastName:{
    type:String,
    
},
emailId:{
    type:String,
    trim:true,
    lowercase:true,
    required:true,
    unique: true
    
},
password:{
    type:String,
    required:true,
},
age:{
    type:Number,
    min:18
},
gender:{
    type:String,
    validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error("Gender Data is not valid")
        }
    }
},
photoUrl:{
type:String,
default:"https://www.pnrao.com/?attachment_id=8917",
},
about:{
    type:String,
    default:"This is a defsult About of the user!",
    },
skills:{
        type:[String],
        }

},{
    timestamps:true,
})

// const User=mongoose.model("User",userSchema);

// module.exports=User;

module.exports=mongoose.model("User",userSchema);