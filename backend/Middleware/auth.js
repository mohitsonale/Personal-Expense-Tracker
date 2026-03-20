import jwt from "jsonwebtoken"

const authMiddleware=async(req,res,next)=>{

    let {token}=req.header

    if(!token){
        return res.json({status:false,message:"Wrong person id"})
    }

    try {

        let tokendecode=jwt.verify(token,process.env.jwt_SECRET)

        if(tokendecode.id){
            req.user={id:tokendecode}
        }
        else{
            return res.json({status:false,message:"Invalid Token"})
        }

        next();
        
    } catch (error) {
        res.json({status:false,message:"Token Verification failed",error:error.message})
    }


}

export default authMiddleware