
async function authAdmin(req,res,next) {
    if(req.user.role!='admin'){
        return res.status(403).json({msg:"not Admin ,Access denied"});
    }
    next();
}

module.exports={authAdmin};