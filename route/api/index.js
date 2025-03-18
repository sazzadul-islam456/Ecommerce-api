const express = require("express")
const route = express.Router()
const authRouth = require("./authentication")

route.use("/authentication", authRouth)


module.exports = route;