const express = require("express");
const postsRoute = require("./PostsRoute");
const commentRoute = require("./CommentRoute");
const notiRoute = require("./NotificationRoute");
const apiRoute = express.Router();

apiRoute.use("/posts", postsRoute);
apiRoute.use("/comment", commentRoute);
apiRoute.use("/noti", notiRoute);

module.exports = apiRoute;