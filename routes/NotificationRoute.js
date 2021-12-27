const express = require("express");
const notiRoute = express.Router();
const notiController = require("../controllers/NotificationController");
const { checkRole, checkAuth } = require("../middlewares/check/Check");

notiRoute.get("/", checkAuth.checkAuthSystem, checkRole.AdminRole, notiController.indexAdmin);

notiRoute.get("/", checkAuth.checkAuthSystem, checkRole.DivisionRole, notiController.indexDivision);

notiRoute.get("/create", checkAuth.checkAuthSystem, checkRole.DivisionRole, notiController.createNotiView);

notiRoute.post("/create", checkAuth.checkAuthSystem, checkRole.DivisionRole, notiController.createNoti);

notiRoute.get("/edit/:_id", checkAuth.checkAuthSystem, checkRole.AdminOrDivisionRole, notiController.updateNotiView);

notiRoute.post("/edit/:_id", checkAuth.checkAuthSystem, checkRole.AdminOrDivisionRole, notiController.updateNoti);

notiRoute.get("/delete/:_id", checkAuth.checkAuthSystem, checkRole.AdminOrDivisionRole, notiController.deleteNoti);

module.exports = notiRoute;