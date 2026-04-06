import express from "express"
import { isAuthenticated, login, registeruser, verifyEmail,sendOTP,verifyOTPandResetPassword } from "../Controller/authController.js";
import authMiddleware from "../Middleware/auth.js";


let authrouter=express.Router();

authrouter.post('/register',registeruser);
authrouter.post('/login',login);
authrouter.get('/is-authentication',authMiddleware,isAuthenticated)
authrouter.get("/verify/:token",verifyEmail);
authrouter.post("/send-otp",sendOTP);
authrouter.post("/send-otp", (req, res) => {
    console.log("🔥 SEND OTP API HIT");
    res.send("API working");
});
authrouter.post("/reset-password-otp",verifyOTPandResetPassword);

export default authrouter; 