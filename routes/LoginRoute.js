const express = require("express");
const passport = require("passport");
const {GoogleUser, LocalUser} = require("../models/UserModel");
const loginRoute = express.Router();

//Config passport
passport.serializeUser((user, done) => {
    let key={type:null, id:null};
    if (user.authId.substring(0, 6) == "google") {
        key = {
            type: "google",
            id: user.id,
        };
    } else {
        key = {
            type: "local",
            id: user.id,
        };
    }
    done(null, key);
});
passport.deserializeUser((key, done) => {
    if (key.type == "google") {
        GoogleUser.findById(key.id).then((user) => {
            done(null, user);
        });
    } else if (key.type == "local") {
        LocalUser.findById(key.id).then((user) => {
            done(null, user);
        });
    }
});

// Require passport-google
require('../middlewares/passport/PassportGoogle');
// Require passport-local
require("../middlewares/passport/PassportLocal");

// Route
loginRoute.get('/', (req, res) => {
    let message = req.flash("message");
    return res.render("index", { title: "Đăng nhập", message: message });
})

loginRoute.get("/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

loginRoute.post("/auth/local",
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        console.log(req.user);
        return res.redirect('/');
    }
);

loginRoute.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/login",
    })
);


module.exports = loginRoute;
