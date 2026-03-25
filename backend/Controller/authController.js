import Usermodel from "../model/Usermodel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"





let registeruser = async (req, res) => {

    console.log("REGISTER API HIT");
    console.log(req.body);

    console.log("JWT SECRET:", process.env.JWT_SECRET);

    try {

        let { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        let exitinguser = await Usermodel.findOne({ email })

        if (exitinguser) {
            return res.json({ success: false, message: "User already exists" })
        }

        let salt = await bcrypt.genSalt(10);
        let hashpassword = await bcrypt.hash(password, salt);

        let newuser = new Usermodel({
            name,
            email,
            password: hashpassword
        })

        console.log("BEFORE SAVE");
        await newuser.save();
        console.log("AFTER SAVE ");
        let token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET)

        res.json({
            success: true,
            message: "Registration Successfull",
            token,
            user: {
                _id: newuser._id,   
                name: newuser.name,
                email: newuser.email
            }
        })

        console.log("RESPONSE SENT ");



    } catch (error) {

        console.log("❌ FULL ERROR:", error);   

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
                _id: user._id,   // ✅ ADD THIS
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

export { registeruser, login, isAuthenticated }; 
