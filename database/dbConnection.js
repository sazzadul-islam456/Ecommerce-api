const mongoose = require('mongoose');

function dbconnection() {
    mongoose.connect(
        `mongodb+srv://${process.env.DBUSER_NAME}:${process.env.DBUSER_PASSWORD}@cluster0.3i8rj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => console.log("Database Connected!"))
    .catch((err) => console.error("Database Connection Error:", err));
}

module.exports = dbconnection;
