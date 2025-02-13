const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please enter a valid email'
        ]
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [10, "Password should be at least 10 characters"]
    }
}, { timestamps: true });

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
