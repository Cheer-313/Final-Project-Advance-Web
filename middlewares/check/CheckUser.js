const {LocalUser, GoogleUser} = require("../../models/UserModel");
const Posts = require("../../models/PostsModel");

const checkUser = (req, res, next) => {
    let _idPost = req.params._id;
    let post = Posts.findOne({_id: _idPost});

    if(req.user._id === post._id){
        return next();
    }

    return res.end(JSON.stringify({
        code: 0,
        message: "Failed",
        error: "User doesnt have permission"
    }))
}

module.exports = checkUser;