const express = require("express");
const postsRoute = express.Router();
const ApiPostsController = require("../../controllers/ApiPostsController");
const {checkAuth, checkUser} = require("../../middlewares/check/Check");

postsRoute.get('/', checkAuth.checkAuthAPI, ApiPostsController.getAll);

postsRoute.get('/:_id', checkAuth.checkAuthAPI, ApiPostsController.getById);

postsRoute.get('/user/:_idUser', checkAuth.checkAuthAPI, ApiPostsController.getByUserId);

postsRoute.post('/', checkAuth.checkAuthAPI, ApiPostsController.createPost);

postsRoute.put('/:_id', checkAuth.checkAuthAPI, checkUser, ApiPostsController.updatePost);

postsRoute.delete("/:_id", checkAuth.checkAuthAPI, checkUser, ApiPostsController.deletePost);

module.exports = postsRoute;