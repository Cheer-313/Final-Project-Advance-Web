const express = require("express");
const passport = require("passport");
const loginController = require("../controllers/LoginController");

const loginRoute = express.Router();

// Require passport-google
require('../middlewares/passport/PassportGoogle');

loginRoute.use(passport.initialize());
loginRoute.use(passport.session());

// Route
loginRoute.get('/', (req, res) => {
    res.render('test');
})

loginRoute.get("/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

loginRoute.get("/auth/google/callback", 
    passport.authenticate("google", {
        successRedirect: '/home',
        failureRedirect: '/login'
    }
));
module.exports = loginRoute;
