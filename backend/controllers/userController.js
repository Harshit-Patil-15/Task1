const User= require("../models/User");
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');


async function registerUser(req,res){
     try{
        const {name ,email,password,role}=req.body;
        const hashPass=await bcrypt.hash(password,10);
       const newUser= User({
        name ,
        email,
        password: hashPass,
        role
        });
        const saveUser=await newUser.save();
        res.status(201).json({message:"user created Sucessfully",user :saveUser});
        
     }catch(err){
        console.log("err aagya" +err.message);
        res.status(400).json({ message:err.message})
     }
    
}

async function loginUser(req,res){
try{
    const {email,password} = req.body;
   let user=await User.findOne({email});
   
   if(!user){
    return res.status(400).json({message:"Invalid email or Password"})
   }
   role=user.role;
   const isMatch=await bcrypt.compare(password,user.password);
   
   if(!isMatch){
    return res.status(400).json({message:"Invalid email or Password"})
   }
   const token=jwt.sign({
    id:user._id,role:user.role}, 
    'jwtSeceret',
    {expiresIn:'1h'});
   res.json({message:"logged in successfully",token,role});
}catch(err){
 console.log("Error "+err.message);
 res.status.json({message:err.message});
}
}
module.exports ={registerUser,loginUser};