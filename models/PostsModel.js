const mongoose = require("mongoose");
const uuid = require("short-uuid");
const moment = require("moment");

const postsSchema = mongoose.Schema({
    postId: {
        type: String,
        default: uuid.generate(),
    },
    userType: {
        type: String,
        require: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "userType",
    },
    content: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: null,
    },
    video: {
        type: String,
        default: null,
    },
    comment: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "comment",
        default: null,
    },
    date: {
        type: String,
        default: moment.utc().local().format("D-M-YYYY H:m:s"),
    },
});

const Posts = mongoose.model("posts", postsSchema);

module.exports = Posts;
