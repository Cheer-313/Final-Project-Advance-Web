const express = require("express");
const postsRoute = express.Router();
const PostsController = require("../../controllers/PostsController");
const {checkAuth, checkUser} = require("../../middlewares/check/Check");

postsRoute.get('/', checkAuth.checkAuthAPI, PostsController.getAll);

postsRoute.get('/:_id', checkAuth.checkAuthAPI, PostsController.getById);

postsRoute.get('/user/:_idUser', checkAuth.checkAuthAPI, PostsController.getByUserId);

postsRoute.post('/', checkAuth.checkAuthAPI, PostsController.createPost);

postsRoute.put('/:_id', checkAuth.checkAuthAPI, checkUser, PostsController.updatePost);

postsRoute.delete("/:_id", checkAuth.checkAuthAPI, checkUser, PostsController.deletePost);

module.exports = postsRoute;