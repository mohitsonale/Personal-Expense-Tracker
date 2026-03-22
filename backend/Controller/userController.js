import Usermodel from "../model/Usermodel.js";

let getUserdata=async(req,res)=>{

    try {

         console.log("USER ID:", req.user.id);  // 👈 add this

        let user=await Usermodel.findById(req.user.id);

        res.json({success:true,message:"Verified User",user:{name:user.name}})
        
    } catch (error) {
        
        res.json({status:false,mnessage:error.mnessage})
    }
}

export default getUserdata;