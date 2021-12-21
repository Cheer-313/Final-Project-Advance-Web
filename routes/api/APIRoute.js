const express = require("express");
const postsRoute = require("./PostsRoute");
const commentRoute = require("./CommentRoute");
const apiRoute = express.Router();

apiRoute.use("/posts", postsRoute);
apiRoute.use("/comment", commentRoute);

module.exports = apiRoute;