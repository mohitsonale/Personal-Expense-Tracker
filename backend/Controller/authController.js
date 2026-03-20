import Usermodel from "../model/Usermodel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


let registeruser=async(req,res)=>{

    try {

        let {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.json({success:false,message:"Missing Details"})
        }

        let exitinguser=await Usermodel.findOne({email})

        if(exitinguser){
            return res.json({success:false,message:"User already exists"})
        }

        let salt=await bcrypt.genSalt(10);
        let hasspassword=await bcrypt.hash(password,salt);

        let newuser=new Usermodel({
            name,
            email,
            password:hasspassword
        })

        await newuser.save()

        let token=jwt.sign({id:newuser._id},process.env.JWT_SECRET,{expiresIn:'7d'})

        res.json({
            success:true,
            message:"Registration Successfull",
            token,
            newuser:{name:newuser.name}
        })


        
    } catch (error) {

        res.json({success:false,message:"Registration failed",error:error.message})
        
    }
}

let login=async(req,res)=>{
    
    let {email,password}=req.body;

    if(!email || !password){
        return res.json({success:false,message:"Wrong email and password"})

    }

    try {

        let user=await Usermodel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User not found"})
        }

        let isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"Invalid Password"})
        }

        let token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

        res.json({
            success:true,
            message:"Successfully Login",
            token,
            user:{name:user.name}
        })


        
    } catch (error) {

        res.json({success:false,message:"Login error",error:message.error})
        
    }
}

export {registeruser,login};