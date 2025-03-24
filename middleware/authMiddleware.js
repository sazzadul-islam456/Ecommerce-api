function authMiddleware(req,res,next) {
if(req.session.isAuth){
    next()
 }else{
    res.json({ error: "Unauthorized user" });
 }
}

module.exports = authMiddleware; 
    