import Usermodel from "../model/Usermodel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import resend from "../config/resend.js";






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

        const verifyLink = `https://personal-expense-tracker-1-24ee.onrender.com/verify/${token}`;

        await resend.emails.send({
            from: "Expense Tracker <noreply@fintracko.online>",
            to: email,
            subject: "Verify Your Email",
            html: `
    <h2>Welcome ${name} to our app.</h2>
    <p>Click below to verify:</p>
    <a href="${verifyLink}">Verify Email</a>
  `,
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

        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

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

let sendOTP = async (req, res) => {

    try {

        let { email } = req.body;

        if (!email) {
            return res.json({
                success: false,
                message: "Email is required"

            })
        }

        let user = await Usermodel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        let otp = Math.floor(100000 + Math.random() * 900000).toString();
        let otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = otpExpiry;

        await user.save();

        await resend.emails.send({
            from: "Expense Tracker <noreply@fintracko.online>",
            to: email,
            subject: "Password Reset OTP",
            html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; text-align: center;">

            <h2 style="color: #333;">Password Reset Request</h2>

            <p style="color: #555; font-size: 14px;">
                We received a request to reset your password. Use the OTP below to proceed:
            </p>

            <h1 style="color: #007BFF; letter-spacing: 3px; margin: 20px 0;">
                ${otp}
            </h1>

            <p style="color: #777; font-size: 13px;">
                This OTP is valid for a limited time. Please do not share it with anyone.
            </p>

            <p style="color: #777; font-size: 13px;">
                If you did not request this, you can safely ignore this email.
            </p>

            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

            <p style="color: #aaa; font-size: 12px;">
                © 2026 fintracko.online. All rights reserved.
            </p>

        </div>
    </div>
    `
        });

        res.json({
            success: true,
            message: "OTP sent to email. Please check your inbox"
        })

    } catch (error) {
        console.log("SEND OTP ERROR:", error);
        res.json({
            success: false,
            message: "Error sending OTP",
            error: error.message
        })

    }
}

let verifyOTPandResetPassword = async (req, res) => {

    try {

        let { email, otp, password } = req.body;

        if (!email || !otp || !password) {
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }

        let user = await Usermodel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.json({
                success: false,
                message: "Invalid or expired OTP"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        user.password = hashpassword;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        res.json({
            success: true,
            message: "Password reset successful"
        })


    } catch (error) {

        res.json({
            success: false,
            message: "Error resetting password",
            error: error.message
        })

    }
}

export { registeruser, login, isAuthenticated, verifyEmail, sendOTP, verifyOTPandResetPassword }; 
