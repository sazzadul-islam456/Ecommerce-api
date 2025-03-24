const express = require("express");
const registrationController = require("../../Controllers/registrationController");
const {otpController, resendotpController} = require("../../Controllers/otpController");
const {loginController,dashboard,logOut} = require("../../Controllers/loginController");
const authMiddleware = require("../../middleware/authMiddleware");
const route = express.Router();

route.post("/registration", registrationController); 
route.post("/otpverify", otpController)
route.post("/resendotp", resendotpController)
route.post("/login", loginController)
route.post("/logOut", logOut)
route.get("/dashboard",authMiddleware, dashboard)

module.exports = route;