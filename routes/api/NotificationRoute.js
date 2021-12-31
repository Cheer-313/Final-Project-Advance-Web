const express = require("express");
const notiRoute = express.Router();
const ApiNotiController = require("../../controllers/ApiNotificationController");
const { checkAuth, checkUser } = require("../../middlewares/check/Check");

notiRoute.get("/", ApiNotiController.GetAll);


module.exports = notiRoute;
