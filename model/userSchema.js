const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate emails
        lowercase: true, // Avoids case-sensitive duplicates
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

module.exports  = mongoose.model("UserList",userSchema)
