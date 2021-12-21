const mongoose = require("mongoose");
const uuid = require("short-uuid");
const moment = require("moment");

const commentSchema = mongoose.Schema({
    commentId: {
        type: String,
        default: uuid.generate(),
    },
    userType: {
        type: String,
        require: true,
    },
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "userType",
    },
    content: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        default: moment.utc().local().format("D-M-YYYY H:m:s"),
    },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;