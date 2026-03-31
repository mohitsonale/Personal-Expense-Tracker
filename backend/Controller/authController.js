import crypto, { hash } from "crypto";
import Usermodel from "../model/Usermodel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import transporter from "../config/nodemailer.js";
import { a } from "motion/react-client";





let registeruser = async (req, res) => {



    try {

        let { name, email, password } = req.body;

        const blockedDomains = ["tempmail.com", "10minutemail.com", "mailinator.com"];

        const domain = email.split("@")[1];

        if (blockedDomains.includes(domain)) {
            return res.json({
                success: false,
                message: "Disposable emails not allowed"
            });
        }

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        let exitinguser = await Usermodel.findOne({ email })

        if (exitinguser) {
            return res.json({ success: false, message: "User already exists" })
        }

        let salt = await bcrypt.genSalt(10);
        let hashpassword = await bcrypt.hash(password, salt);

      


        // await newuser.save();


        const token = jwt.sign({ name, email, password: hashpassword }, process.env.JWT_SECRET, { expiresIn: "1h" }
        );

        const verifyLink = `http://localhost:5173/verify/${token}`;

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Verify Your Email",
            html: `
            <h2>Welcome ${name} to our platform!</h2>
            <p>We're glad to have you on board. Your account has been successfully created with the email id: ${email}.</p>
                 <h2>Email Verification</h2>
                 <p>Click below link to verify:</p>
                  <a href="${verifyLink}">Verify Email</a>
                 `
        });
        console.log("Mail sent successfully to:", email);

        return res.json({
            success: true,
            message: "Verification email sent. Please check your inbox"
        });
     



    } catch (error) {

        console.log(" FULL ERROR:", error);

        return res.json({
            success: false,
            message: "Registration failed",
            error: error.message
        })

    }
}

let login = async (req, res) => {

    let { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Wrong email and password" })

    }

    try {

        let user = await Usermodel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Password" })
        }

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({
            success: true,
            message: "Successfully Login",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })



    } catch (error) {

        res.json({ success: false, message: "Login error", error: error.message })

    }
}

let isAuthenticated = async (req, res) => {

    try {

        return res.json({ success: true, message: "User is authenticated" })

    }
    catch (error) {
        return res.send({ success: false, message: error.message })
    }
}

let verifyEmail = async (req, res) => {
    try {
        console.log("VERIFY API HIT");
        console.log("TOKEN:", req.params.token);
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
        console.log("DECODED:", decoded);
        const { name, email, password } = decoded;

      
        const existingUser = await Usermodel.findOne({ email });
        if (existingUser) {
            return res.send("User already exists");
        }

       
        const user = new Usermodel({
            name,
            email,
            password
        });

        await user.save();

        console.log("USER SAVED");



        res.send("Account created successfully ✅");
    } catch (error) {
        res.send("Invalid or expired link ❌");
    }
};

let sendOTP=async(req,res)=>{

    try {

        let {email}=req.body;

        if(!email){
            return res.json({
                success:false,
                message:"Email is required"

            })
        }
        
        let user=await Usermodel.findOne({email});

        if(!user){
            return res.json({
                success:false,
                message:"User not found"
            })
        }

        let otp=Math.floor(100000+Math.random()*900000).toString();
        let otpExpiry=new Date(Date.now()+10*60*1000);

        user.otp=otp;
        user.otpExpiry=otpExpiry;

        await user.save();

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to:email,
            subject:"Password Reset OTP",
            html:`
            <h2>Password Reset OTP</h2>
            <p>Your OTP for password reset is</p>
            <p style="font-size: 18px;color:blue">${otp}</p>
            `

        })

        res.json({
            success:true,
            message:"OTP sent to email. Please check your inbox"
        })
        
    } catch (error) {

        res.json({
            success:false,
            message:"Error sending OTP",
            error:error.message
        })
        
    }
}

let verifyOTPandResetPassword=async(req,res)=>{

    try {
        
        let{email,otp,password}=req.body;

        if(!email || !otp || !password){
            return res.json({
                success:false,
                message:"All fields are required"
            })
        }

        let user=await Usermodel.findOne({email});

        if(!user){
            return res.json({  
                success:false,
                message:"User not found"
            })      
        }

        if(user.otp!==otp || user.otpExpiry<Date.now()){
            return res.json({
                success:false,
                message:"Invalid or expired OTP"
            })
        }

        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);

        user.password=hashpassword;
        user.otp=null;
        user.otpExpiry=null;

        await user.save();

        res.json({
            success:true,
            message:"Password reset successful"
        })

        
    } catch (error) {

        res.json({
            success:false,
            message:"Error resetting password",
            error:error.message
        })
        
    }
}

export { registeruser, login, isAuthenticated, verifyEmail, sendOTP, verifyOTPandResetPassword }; 
