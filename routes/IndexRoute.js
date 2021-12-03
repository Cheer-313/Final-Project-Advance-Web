const express = require("express");
const indexRoute = express.Router();

// Index route
indexRoute.get("/", (req, res) => {
    res.redirect("/login");
});

indexRoute.get("/home", (req,res) => {
    return res.end(req.user);
})

module.exports = indexRoute;
