// Require .env
require("dotenv").config();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/UserModel");



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET_ID,
            callbackURL: "/login/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            // Check if google profile exist.
            if (profile.id) {

                // Check if email is student.tdtu.edu.vn or tdtu.edu.vn
                if(profile._json.hd !== "student.tdtu.edu.vn" || profile._json.hd !== "tdtu.edu.vn"){
                    let err = "Your email is unavailable";
                    return done(err, null)
                }

                const authId = "google:" + profile.id;
                User.findOne({ authId: authId }).then((user, error) => {
                    if(error){
                        return done(error);
                    }
                    if (user) {
                        done(null, user);
                    } else {
                        new User({
                            authId: authId,
                            username: null,
                            password: null,
                            fullname: profile.displayName,
                            email: profile.emails[0].value,
                            class: null,
                            falcuty: null,
                            avatar: profile.photos[0].value,
                            categories: null,
                            permission: 2,
                        }).save()
                        .then((user) => done(null, user));
                    }
                });
            }
        }
    )
);
