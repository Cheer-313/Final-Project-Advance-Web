const express = require("express");
const commentRoute = express.Router();
const ApiCommentController = require("../../controllers/ApiCommentController");
const { checkAuth, checkUser } = require("../../middlewares/check/Check");

commentRoute.get("/", checkAuth.checkAuthAPI, ApiCommentController.getAll);

commentRoute.get("/:_id", checkAuth.checkAuthAPI, ApiCommentController.getById);

commentRoute.get("/user/:_idUser", checkAuth.checkAuthAPI, ApiCommentController.getByUserId);

commentRoute.post("/", checkAuth.checkAuthAPI, ApiCommentController.createComment);

commentRoute.put("/:_id", checkAuth.checkAuthAPI, checkUser, ApiCommentController.updateComment);

commentRoute.delete("/:_id", checkAuth.checkAuthAPI, checkUser, ApiCommentController.deleteComment);

module.exports = commentRoute;
