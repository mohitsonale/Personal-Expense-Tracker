import mongoose from "mongoose";


let Userschema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: String,
    otpExpiry: Date

})

let Usermodel = mongoose.model('User', Userschema);

export default Usermodel;
