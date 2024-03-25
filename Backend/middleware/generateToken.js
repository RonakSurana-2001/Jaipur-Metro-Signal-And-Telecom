const jwt = require('jsonwebtoken');

const {secretKey}=require('../.env')


const genToken=(user)=>{
    // console.log(user)
    const token = jwt.sign({username:user[0].username,email:user[0].email}, secretKey);
    return token
}

const validateToken=(req,res,next)=>{
    const accessToken=req.body.token;
    // console.log(accessToken)
    if(!accessToken){
        return res.status(400).json({error:"user not authenticated"})
    }
    try{
        const validToken=jwt.verify(accessToken,secretKey)
        if(validToken){
            req.authenticated=true
            return next()
        }
    }catch(err){
        return res.status(400).json({error:err})
    }
}

module.exports={genToken,validateToken}
