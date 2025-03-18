const express = require("express");
const registrationController = require("../../Controllers/registrationController");
const route = express.Router();

route.post("/registration", registrationController); // This should work if the function is correct

module.exports = route;