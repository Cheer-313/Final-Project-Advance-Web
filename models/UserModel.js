const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    authId: String,
    username: String,
    password: String,
    fullname: String,
    email: String,
    class: String,
    faculty: String,
    avatar: String,
    categories: [String],
    permission: Number,
    time: { 
        type: Date, 
        default: Date.now 
    },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
