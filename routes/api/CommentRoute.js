const express = require("express");
const commentRoute = express.Router();
const CommentController = require("../../controllers/CommentController");
const { checkAuth, checkUser } = require("../../middlewares/check/Check");

commentRoute.get("/", checkAuth.checkAuthAPI, CommentController.getAll);

commentRoute.get("/:_id", checkAuth.checkAuthAPI, CommentController.getById);

commentRoute.get("/user/:_idUser", checkAuth.checkAuthAPI, CommentController.getByUserId);

commentRoute.post("/", checkAuth.checkAuthAPI, CommentController.createComment);

commentRoute.put("/:_id", checkAuth.checkAuthAPI, checkUser, CommentController.updateComment);

commentRoute.delete("/:_id", checkAuth.checkAuthAPI, checkUser, CommentController.deleteComment);

module.exports = commentRoute;
