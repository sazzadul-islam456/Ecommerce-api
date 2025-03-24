require('dotenv').config();
const express = require("express");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
app.use(express.json());

const dbconnection = require("./database/dbConnection");
const route = require("./route");

const port = 3000;

dbconnection();

const store = new MongoDBStore({
  uri: `mongodb+srv://${process.env.DBUSER_NAME}:${process.env.DBUSER_PASSWORD}@cluster0.3i8rj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`,
  collection: 'mySessions'
});
store.on('error', function (error) {
    console.error("Session store error:", error);
});
app.use(session({
  secret: 'sazzadmern2402',
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: { secure: process.env.NODE_ENV === 'production' } 
}));

app.use(route);
app.listen(port, () => {
  console.log("Backend is running");
});
