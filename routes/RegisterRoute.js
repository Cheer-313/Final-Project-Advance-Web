const express = require("express");
const registerController = require("../controllers/RegisterController");
const registerRoute = express.Router();

registerRoute.get('/', registerController.index);
registerRoute.post("/", registerController.register);

module.exports = registerRoute;