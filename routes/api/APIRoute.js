const express = require("express");
const postsRoute = require("./PostsRoute");
const apiRoute = express.Router();

apiRoute.use("/posts", postsRoute);

module.exports = apiRoute;