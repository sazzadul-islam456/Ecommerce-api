const userSchema = require("../model/userSchema")
const emailValidation = require("../helpers/emailValidation")
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const emailVarification = require("../helpers/emailVerification");



 async function registrationController(req,res){
    const {firstName,lastName,email,password} = req.body
    if(!firstName || !lastName){
        return res.json({error: "Firstname & lastname is required"})
    }
    if(!email){
        return res.json({error: "Email is required"})
    }
    
    if(!emailValidation(email)){
        return res.json({error: "Email is not valid"})
    }

    const exisitingEmail = await userSchema.find({email})
    if(exisitingEmail.length > 0){
        return res.json({error:"Email is in used"})
    }if(!password){
        return res.json({error: "Password is required"})
    }
 

    const otp = crypto.randomInt(100000,999999).toString()
    

    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000)


    bcrypt.hash(password, 10, function(err, hash) {
        const users = new userSchema({
            firstName,
            lastName,
            email,
            password: hash,
            otp,
            otpExpiry, 
        })
        emailVarification(email, otp);
        users.save()
    });

    

    res.status(200).json({
        message: "Registration successfully done",
        status: "success",
        
    })
}
module.exports = registrationController