const express = require("express");
const indexRoute = express.Router();

// Index route
indexRoute.get("/", (req, res) => {
    res.redirect("/login");
});

indexRoute.get("/home", (req,res) => {
    console.log(req.user);
    return res.render("home", {user: req.user});
})

indexRoute.get("/error", (req, res) => {
    res.render("error");
});

indexRoute.get("/log", (req, res) => {
    res.render("login");
});

module.exports = indexRoute;
