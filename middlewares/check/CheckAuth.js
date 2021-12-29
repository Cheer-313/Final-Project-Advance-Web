const checkAuthSystem = (req, res, next) => {
    if(req.user){
        return next();
    }
    return res.redirect('/');
}

const checkAuthAPI = (req, res, next) => {
    if (req.user) {
        return next();
    }
    return res.end(JSON.stringify({
        code: 0,
        message: "Error",
        error: "Cant authenticate user."
    }));
};

module.exports = {
    checkAuthSystem,
    checkAuthAPI
};