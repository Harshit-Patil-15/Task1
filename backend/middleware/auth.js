const jwt = require('jsonwebtoken');
const User = require('../models/User');


async function auth (req,res,next){
    const token=req.header('Authorization');
    if(!token) return res.status(400).json({msg:"no token,authorization denied"});
    try{
        const decoded= jwt.verify(token,"jwtSeceret");
        console.log(decoded);
        req.user=decoded;
        const user=await User.findById(req.user.id);
        if(!user){
            return res.status(401).json({ msg: 'User not found' });
        }
        req.user.role=user.role;
        next();
    }catch(err){
        res.status(401).json({msg:"token is not valid"});
    }

};
module.exports={auth};