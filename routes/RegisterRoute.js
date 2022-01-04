const express = require("express");
const registerController = require("../controllers/RegisterController");
const registerRoute = express.Router();
const { checkRole, checkAuth } = require("../middlewares/check/Check");

registerRoute.get("/", checkAuth.checkAuthSystem, checkRole.AdminRole, registerController.index);
registerRoute.post("/", checkAuth.checkAuthSystem, checkRole.AdminRole, registerController.register);

module.exports = registerRoute;