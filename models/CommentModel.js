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
        type: Date,
        default: moment.utc().local(),
    },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;