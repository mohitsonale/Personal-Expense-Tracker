import mongoose from "mongoose";    


let Userschema= new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    }
})

let Usermodel= mongoose.model('Users',Userschema);

export default Usermodel;
 