const mongoose = require("mongoose");
const uuid = require("short-uuid");
const moment = require("moment");

const notificationSchema = mongoose.Schema({
    notiId: {
        type: String,
        default: uuid.generate(),
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "local",
        require: true
    },
    division:{
        type: String,
        require: true,
        default: null
    },
    title:{
        type: String,
        require: true,
    },
    body:{
        type: String,
        require: true,
    },
    filePath:{
        type: [String],
        default: null
    },
    date: {
        type: Date,
        default: moment.utc().local(),
    },
});

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;