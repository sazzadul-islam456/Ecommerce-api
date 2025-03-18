const userSchema = require("../model/userSchema")

function registrationController(req,res){
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

    const users = new userSchema({
        firstName,
        lastName,
        email,
        password
    })
    users.save()

    res.status(200).json({
        message: "Registration successfully done",
        status: "success",
        data: users
    })
}
module.exports = registrationController