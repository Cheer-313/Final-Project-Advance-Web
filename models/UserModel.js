const mongoose = require("mongoose");
const moment = require("moment");

const googleSchema = mongoose.Schema({
    authId: String,
    fullname: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
        unique: true,
        sparse: true,
    },
    class: {
        type: String,
        default: null,
    },
    faculty: {
        type: String,
        default: null,
    },
    avatar: {
        type: String,
        default: null,
    },
    role: {
        type: [String],
        default: null,
    },
    time: {
        type: Date,
        default: moment.utc().local(),
    },
});

const localSchema = mongoose.Schema({
    authId: String,
    username: {
        type: String,
        default: null,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
        default: null,
    },
    fullname: {
        type: String,
        default: null,
    },
    avatar: {
        type: String,
        default: null,
    },
    role: {
        type: [String],
        default: null,
    },
    time: {
        type: Date,
        default: moment.utc().local(),
    },
});

const GoogleUser = mongoose.model("google", googleSchema, "googleuser");
const LocalUser = mongoose.model("local", localSchema, "localuser");

module.exports = {
    GoogleUser,
    LocalUser
};
