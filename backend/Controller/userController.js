import Usermodel from "../model/Usermodel.js";

let getUserdata=async(req,res)=>{

    try {

        let userId=req.user.id;

        let user=await Usermodel.findOne(userId);

        res.json({success:true,message:"Verified User",user:{name:user.name}})
        
    } catch (error) {
        
        res.json({status:false,mnessage:error.mnessage})
    }
}

export default getUserdata;