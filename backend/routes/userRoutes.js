const express =require("express");
const regUser =require("../controllers/userController");

const router=express.Router();
// router.use(express.json());

router.post('/register',regUser.registerUser);
router.post('/login',regUser.loginUser);


module.exports=router;