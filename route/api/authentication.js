const express = require("express");
const registrationController = require("../../Controllers/registrationController");
const otpController = require("../../Controllers/otpController");
const route = express.Router();

route.post("/registration", registrationController); // This should work if the function is correct
route.post("/otpverify", otpController)
module.exports = route;