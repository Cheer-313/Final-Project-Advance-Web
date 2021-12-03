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

module.exports = indexRoute;
