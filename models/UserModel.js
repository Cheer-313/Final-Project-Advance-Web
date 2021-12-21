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
        type: String,
        default: moment.utc().local().format("D-M-YYYY H:m:s"),
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
        type: String,
        default: moment.utc().local().format("D-M-YYYY H:m:s"),
    },
});

const GoogleUser = mongoose.model("google", googleSchema, "user");
const LocalUser = mongoose.model("local", localSchema, "user");

module.exports = {
    GoogleUser,
    LocalUser
};
