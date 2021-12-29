const Posts = require("../models/PostsModel");
const Comment = require("../models/CommentModel");
const upload = require("../middlewares/upload/UploadImage");

class CommentController {
    getAll(req, res) {
        try {
            Comment.find()
                .populate("commentBy")
                .exec(function (err, comments) {
                    if (err) {
                        return res.end(
                            JSON.stringify({
                                code: 0,
                                message: "Error",
                                error: err,
                            })
                        );
                    }
                    return res.end(
                        JSON.stringify({
                            code: 1,
                            message: "Success",
                            result: comments,
                        })
                    );
                });
        } catch (error) {
            return res.end(
                JSON.stringify({
                    code: 0,
                    message: "Catch Error",
                    error: error,
                })
            );
        }
    }

    getById(req, res) {
        try {
            let _idComment = req.params._id;
            Comment.findOne({ _id: _idComment })
                .populate("commentBy")
                .exec(function (err, comment) {
                    if (err) {
                        return res.end(
                            JSON.stringify({
                                code: 0,
                                message: "Exec Error",
                                error: err,
                            })
                        );
                    }
                    return res.end(
                        JSON.stringify({
                            code: 1,
                            message: "Success",
                            result: comment,
                        })
                    );
                });
        } catch (error) {
            return res.end(
                JSON.stringify({
                    code: 0,
                    message: "Catch Error",
                    error: error,
                })
            );
        }
    }

    getByUserId(req, res) {
        try {
            let _idUser = req.params._idUser;
            console.log(_idUser)
            Comment.findOne({ commentBy: _idUser }, function (err, comment) {
                if (err) {
                    return res.end(
                        JSON.stringify({
                            code: 0,
                            message: "Exec Error",
                            error: err,
                        })
                    );
                }
                console.log(comment);
                return res.end(
                    JSON.stringify({
                        code: 1,
                        message: "Success",
                        result: comment,
                    })
                );
            });
        } catch (error) {
            return res.end(
                JSON.stringify({
                    code: 0,
                    message: "Catch Error",
                    error: error,
                })
            );
        }
    }

    async createComment(req, res){
        try {
            let { content, _idPost } = req.body;
            let userType = req.user.authId.substring(0, 6) == "google" ? "google" : "local";

            if (!content) {
                return res.end(
                    JSON.stringify({
                        code: 0,
                        message: "Error",
                        error: "Invalid content",
                    })
                );
            }

            await Comment.create(
                {
                    userType: userType,
                    commentBy: req.user._id,
                    content: content,
                },
                async function (error, comment) {
                    console.log(comment._id);
                    if (error) {
                        return res.end(
                            JSON.stringify({
                                code: 0,
                                message: "Post comment error",
                                error: error,
                            })
                        );
                    } else {
                        await Posts.findOneAndUpdate({_id: _idPost}, {$push: {comment: comment._id}},);
                        return res.end(
                            JSON.stringify({
                                code: 1,
                                message: "Successful",
                                result: true,
                            })
                        );
                    }
                }
            );
        } catch (error) {
             return res.end(
                 JSON.stringify({
                     code: 0,
                     message: "Catch error",
                     error: error,
                 })
             );
        }

    }

    updateComment(req, res){
        try {
            let _idComment = req.params._id;
            let { content } = req.body;

            if (!content) {
                return res.end(
                    JSON.stringify({
                        code: 0,
                        message: "Error",
                        error: "Invalid content",
                    })
                );
            }

            Comment.findOneAndUpdate({ _id: _idComment }, { content: content }, function (error, ressult) {
                if (error) {
                    return res.end(
                        JSON.stringify({
                            code: 0,
                            message: "Update Comment Error",
                            error: error,
                        })
                    );
                } else {
                    return res.end(
                        JSON.stringify({
                            code: 1,
                            message: "Successful",
                            result: true,
                        })
                    );
                }
            });
        } catch (error) {
            return res.end(
                JSON.stringify({
                    code: 0,
                    message: "Catch Error",
                    error: error,
                })
            );
        }
    }

    deleteComment(req, res){
        try {
            let _idComment = req.params._id;

            Comment.findOneAndDelete({ _id: _idComment }, (error, result) => {
                if (error) {
                    return res.end(
                        JSON.stringify({
                            code: 0,
                            message: "Delete Error",
                            error: error,
                        })
                    );
                }
                return res.end(
                    JSON.stringify({
                        code: 1,
                        message: "Delete successfully",
                        result: true,
                    })
                );
            });
        } catch (error) {
            return res.end(
                JSON.stringify({
                    code: 0,
                    message: "Catch Error",
                    error: error,
                })
            );
        }
    }

}

module.exports = new CommentController();
