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

    },
     isAccountVerified:{    
        type:Boolean,
        default:false
    },

})

let Usermodel= mongoose.model('User',Userschema);

export default Usermodel;
 