const mongoose=require("mongoose");
const validator=require("validator");

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
    unique: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid email address:" + value)
        }
    }
    
},
password:{
    type:String,
    required:true,
     validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("Enter a strong Password:" + value)
        }
    },
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
  validate(value){
        if(!validator.isURL(value)){
            throw new Error("Invalid Photo URL:" + value)
        }
    },
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