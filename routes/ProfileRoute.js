const express = require("express");
const profileRoute = express.Router();
const profileController = require("../controllers/ProfileController");
const {checkRole, checkAuth} = require('../middlewares/check/Check');

profileRoute.get('/', checkAuth, profileController.index);

profileRoute.get("/password", checkAuth, checkRole.DivisionRole, profileController.password);

profileRoute.post("/password", checkAuth, checkRole.DivisionRole, profileController.changePassword);

profileRoute.get("/edit", checkAuth, checkRole.StudentRole, profileController.edit);

profileRoute.post("/edit", checkAuth, checkRole.StudentRole, profileController.editProfile);

module.exports = profileRoute;