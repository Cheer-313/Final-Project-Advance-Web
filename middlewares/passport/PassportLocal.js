const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/UserModel");

passport.serializeUser((user, done) => {
    console.log('serial');
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log("deserial");
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new LocalStrategy(async function (username, password, done) {
        console.log(username, password);
        await User.findOne({ username: username }, function (err, user) {
            console.log(user);
            if (err) {
                console.log("abc");
                return done(err);
            }
            if (!user) {
                console.log("bc");
                return done(null, false);
            }
            // if (!user.verifyPassword(password)) {
            //     console.log("c");
            //     return done(null, false);
            // }
            return done(null, user);
        });
    })
);
