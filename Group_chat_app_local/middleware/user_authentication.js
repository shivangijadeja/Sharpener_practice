const jwt=require('jsonwebtoken')

const authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorization');
        const user = jwt.verify(token,'secretkey');
        req.user_id=user.user_id
        req.user_name=user.user_name
        next();
    }
    catch(err){
        console.log(err)
        return res.status(401).json({success:false})
    }
    
    
}

module.exports={
    authenticate
}