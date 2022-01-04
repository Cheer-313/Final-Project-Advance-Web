const express = require("express");
const indexRoute = express.Router();
const check = require("../middlewares/check/Check");

// Index route
indexRoute.get("/", check.checkLogin,(req, res) => {
    return res.render("home", { title: "Home" });
});

indexRoute.get("/test",  (req, res) => {
    return res.render("test", { title: "Test" });
});

indexRoute.get("/logout", (req, res) => {
    req.logout();
    return res.redirect('/login');
})

module.exports = indexRoute;
