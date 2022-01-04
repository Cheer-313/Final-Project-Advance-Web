const express = require("express");
const profileRoute = express.Router();
const profileController = require("../controllers/ProfileController");
const {checkRole, checkAuth} = require('../middlewares/check/Check');

profileRoute.get('/', checkAuth.checkAuthSystem, profileController.index);

profileRoute.get("/password", checkAuth.checkAuthSystem, checkRole.DivisionRole, profileController.password);

profileRoute.post("/password", checkAuth.checkAuthSystem, checkRole.DivisionRole, profileController.changePassword);

// profileRoute.get("/edit", checkAuth.checkAuthSystem, checkRole.StudentRole, profileController.edit);

profileRoute.post("/edit", checkAuth.checkAuthSystem, checkRole.StudentRole, profileController.editProfile);

profileRoute.get("/:authId", checkAuth.checkAuthSystem, profileController.index);

module.exports = profileRoute;