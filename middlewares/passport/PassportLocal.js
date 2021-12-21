const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {LocalUser} = require("../../models/UserModel");
const bcrypt = require('bcrypt');

// Local Passport
passport.use(
    new LocalStrategy(function (username, password, done) {
        try {
            console.log(username, password);
            LocalUser.findOne({ username: username }, function (err, user) {
                if (err) {
                    return done(err);
                }
                // Not existed user
                if (!user) {
                    return done(null, false);
                }
                
                // Compare password with database password 
                let result = bcrypt.compareSync(password, user.password)
                if(!result){
                    let error = "Password does not match";
                    return done(error);
                }
                return done(null, user);
            });
        } catch (error) {
            console.log(error);
        }
    
    })
);
