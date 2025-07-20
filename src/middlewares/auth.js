
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
const auth=async (req,res,next)=>{
    let token=req?.cookies?.token
    if(!token){
        res.status(400).json({
            message:"Not logged in,Login to access this!!"
        })
        return;
    }
    let decodedData=jwt.verify(token,process.env.JWT_SECRET)
    let user=await User.findById(decodedData?.id)
    console.log(user);
    if(!user){
        res.status(400).json({
            message:"Token expired"
        })
        return; 
    }
    req.userId=user._id
    req.role=user.role
    req.username=user.username
    next()
}

const verifyRole=(role)=>{
    return (req, res, next) => {
        if(req.role !== role){
            res.status(403).json({
                message:"Access denied"
            })
            return;
        }
        next();
    }
}

export { auth, verifyRole };