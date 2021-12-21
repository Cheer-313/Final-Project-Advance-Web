const mongoose = require("mongoose");
const uuid = require("short-uuid");
const moment = require("moment");

const commentSchema = mongoose.Schema({
    commentId: {
        type: String,
        default: uuid.generate(),
    },
    content: {
        type: String,
        require: true,
    },
    userType: {
        type: String,
        require: true,
    },
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "userType",
    },
    date: {
        type: String,
        default: moment.utc().local().format("D-M-YYYY H:m:s"),
    },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;