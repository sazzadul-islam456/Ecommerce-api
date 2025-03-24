const emailValidation = require("../helpers/emailValidation");
const userSchema = require("../model/userSchema");
const bcrypt = require('bcrypt');

async function loginController(req, res) {
    const { email, password } = req.body;

    if (!email) {
        return res.json({ error: "Give your email" });
    }
    if (!emailValidation(email)) {
        return res.json({ error: "Email is not valid" });
    }
    if (!password) {
        return res.json({ error: "Give your password" });
    }

    const exisitingUser = await userSchema.find({ email });
    console.log(exisitingUser);

    if (exisitingUser.length > 0) {
        if (!exisitingUser[0].isVerified) {
            return res.json({ error: "Email is not verified" });
        }

        
        bcrypt.compare(password, exisitingUser[0].password, function (err, result) {
            if (err) {
                return res.json({ error: "Error while checking the password" });
            }

            if (result) {
                return res.status(200).json({
                    message: "Login successfully done",
                });
            } else {
                return res.json({ error: "Incorrect password" });
            }
        });

        req.session.isAuth = true
        req.session.user = {
            id: exisitingUser[0].id,
            email: exisitingUser[0].email,
            firstName: exisitingUser[0].firstName,
        }


    } else {
        return res.json({ error: "User not found" });
    }
}

function logOut(req,res){
    req.session.destroy(function(err) {
        if(err){
            res.status(400).json({error: "Somthing is error"})
        }
    })
    res.clearCookie('connect.sid'); 
    res.status(200).json({
        message: "Logout successfully done"
    })
}

function dashboard(req, res) {
    res.status(200).json({
        message: "Welcome to dashboard",
    })
}

module.exports = {loginController, dashboard, logOut};
