const express = require("express");
const notiRoute = express.Router();
const notiController = require("../controllers/NotificationController");
const { checkRole, checkAuth } = require("../middlewares/check/Check");

notiRoute.get("/", checkAuth.checkAuthSystem, notiController.notiView);

notiRoute.get("/division/:division", checkAuth.checkAuthSystem, notiController.notiView);

notiRoute.get("/manage/", checkAuth.checkAuthSystem, checkRole.AdminRole, notiController.manageAdminView);

notiRoute.get("/manage/", checkAuth.checkAuthSystem, checkRole.DivisionRole, notiController.manageDivisionView);

notiRoute.get("/create", checkAuth.checkAuthSystem, checkRole.AdminOrDivisionRole, notiController.createNotiView);

notiRoute.post("/create", checkAuth.checkAuthSystem, checkRole.AdminOrDivisionRole, notiController.createNoti);

notiRoute.get("/edit/:_id", checkAuth.checkAuthSystem, checkRole.AdminOrDivisionRole, notiController.updateNotiView);

notiRoute.post("/edit/:_id", checkAuth.checkAuthSystem, checkRole.AdminOrDivisionRole, notiController.updateNoti);

notiRoute.get("/delete/:_id", checkAuth.checkAuthSystem, checkRole.AdminOrDivisionRole, notiController.deleteNoti);

notiRoute.get("/:path", checkAuth.checkAuthSystem, notiController.detailNotiView);

module.exports = notiRoute;