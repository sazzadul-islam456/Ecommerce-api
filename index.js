require('dotenv').config()
const express = require("express");
const app = express();
app.use(express.json())

const dbconnection = require("./database/dbConnection");
const  route  = require("./route");

const port = 3000;
dbconnection()
app.use(route)


app.listen(port, (req, res) => {
  console.log("Backend is running");
});
