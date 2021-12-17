const express = require("express");
const passport = require("passport");
const loginController = require("../controllers/LoginController");

const loginRoute = express.Router();

// Require passport-google
require('../middlewares/passport/PassportGoogle');
// Require passport-local
require("../middlewares/passport/PassportLocal");

// Route
loginRoute.get('/', (req, res) => {
    res.render('test');
})

loginRoute.get("/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

loginRoute.post("/auth/local",
    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/error",
    })
);

loginRoute.get("/auth/google/callback", 
    passport.authenticate("google", {
        successRedirect: '/home',
        failureRedirect: '/login'
    }
));


module.exports = loginRoute;
