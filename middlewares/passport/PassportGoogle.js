const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {GoogleUser} = require("../../models/UserModel");


// Google Passport
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
                if (profile._json.hd !== "student.tdtu.edu.vn" && profile._json.hd !== "tdtu.edu.vn") {
                    let err = "Your email is unavailable";
                    return done(err, null);
                }

                const authId = "google:" + profile.id;
                GoogleUser.findOne({ authId: authId }).then((user, error) => {
                    if (error) {
                        return done(error);
                    }
                    if (user) {
                        done(null, user);
                    } else {
                        new GoogleUser({
                            authId: authId,
                            fullname: profile.displayName,
                            email: profile.emails[0].value,
                            avatar: profile.photos[0].value,
                            role: "Student",
                        })
                            .save()
                            .then((user) => done(null, user));
                    }
                });
            }
        }
    )
);
