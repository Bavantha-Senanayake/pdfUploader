const User=require('../models/User');  
const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');

//check user iv authorized or not
const authMiddleWare=asyncHandler(async(req,res,next)=>{
let token;
if(req?.headers?.authorization?.startsWith('Bearer')){
    token=req.headers.authorization.split(' ')[1];
    try{
        if(token){
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decoded.id);
            next();
        }
    }catch(error){
        throw new Error('not authrizied,token failed');
    }

}else{
    throw new Error('no token attached');
}
});

//check role is user or not
const isUser = asyncHandler(async(req,res,next)=>{
   const {email}=req.user;
   const adminUser=await User.findOne({email});
   if(adminUser.role !== 'user'){
       throw new Error('Not authorized as an admin');
   }else{
       next();
   }
});

module.exports={authMiddleWare,isUser};