const checkLogin = (req, res, next) => {
    if(req.user){
        return next();
    }
    return res.redirect("/login");
}

module.exports = checkLogin;