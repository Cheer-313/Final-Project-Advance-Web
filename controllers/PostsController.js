const Posts = require("../models/PostsModel");
const Comment = require("../models/CommentModel");
const upload = require("../middlewares/upload/UploadImage");
const validateUrlYoutube = require("../middlewares/validator/ValidateUrlYoutube");
const fs = require("fs");

class PostsController{
    getAll(req, res){
        try {
            Posts.find()
                .populate("postedBy comment")
                .exec(function (err, post) {
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
                            result: post,
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

    getById(req, res){
        try {
            let _idPost = req.params._id;
            Posts.findOne({ _id: _idPost })
                .populate("postedBy comment")
                .exec(function (err, post) {
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
                            result: post,
                        })
                    );
                });
        } catch (error) {
            return res.end(
                JSON.stringify({
                    code: 0,
                    message: "Error",
                    error: error,
                })
            );
        }
    }

    getByUserId(req, res){
        try {
            let _idUser = req.params._idUser;

            Posts.find({ postedBy: _idUser })
                .populate("postedBy comment")
                .exec(function (err, post) {
                    if (err) {
                        return res.end(
                            JSON.stringify({
                                code: 0,
                                message: "Exac Error",
                                error: err,
                            })
                        );
                    }
                    return res.end(
                        JSON.stringify({
                            code: 1,
                            message: "Success",
                            result: post,
                        })
                    );
                });
        } catch (error) {
            return res.end(
                JSON.stringify({
                    code: 0,
                    message: "Exac Error",
                    error: error,
                })
            );
        }
    }

    createPost(req, res){
        try {
            let handler = upload.single("imagePost");
            handler(req, res, async (error) => {
                let imagePost = req.file;
                let imagePath = null;
                let { content, video } = req.body;

                if (error) {
                    return res.end(
                        JSON.stringify({
                            code: 0,
                            message: "Image Error",
                            error: error,
                        })
                    );
                }

                if (imagePost) {
                    // Get authId except google or local
                    let folder = req.user.authId.substring(0, 6) == "google" ? req.user.authId.substring(7) : req.user.authId.substring(6);

                    let newPath = `uploads/${folder}/post`;
                    if (!fs.existsSync(newPath)) {
                        fs.mkdirSync(newPath, { recursive: true });
                    }

                    imagePath = newPath + `/${imagePost.originalname}`;
                    fs.renameSync(imagePost.path, imagePath);
                }

                // Vaidator URL Youtube
                if(video && !validateUrlYoutube(video)){
                    return res.end(
                        JSON.stringify({
                            code: 0,
                            message: "URL error",
                            error: "Invalid url youtube",
                        })
                    );
                }

                // Get user type
                let userType = req.user.authId.substring(0, 6) == "google" ? "google" : "local";
                await Posts.create({
                    userType: userType,
                    postedBy: req.user._id,
                    content: content,
                    image: imagePath,
                    video: video,
                });

                return res.end(
                    JSON.stringify({
                        code: 1,
                        message: "Successful",
                        result: true,
                    })
                );
            });
        } catch (error) {
            return res.end(JSON.stringify({
                code: 0,
                message: "ERROR",
                error: error
            }))
        }
    }

    updatePost(req, res){
        try {
            let _idPost = req.params._id;
            let { content, video } = req.body;

            // Get old image path
            let oldPost = Posts.findOne({ _id: _idPost });
            let imagePath = oldPost.image
            console.log(imagePath)

            let handler = upload.single("imagePost");
            handler(req, res, async (error) => {
                let imagePost = req.file;

                if (error) {
                    return res.end(
                        JSON.stringify({
                            code: 0,
                            message: "Image Error",
                            error: error,
                        })
                    );
                }

                if (imagePost) {
                    // Get authId except google or local
                    let folder = req.user.authId.substring(0, 6) == "google" ? req.user.authId.substring(7) : req.user.authId.substring(6);
                    // let folder = "61c15ad4d2463136426be8ba";
                    let newPath = `uploads/${folder}/post`;

                    // Create new folder
                    if (!fs.existsSync(newPath)) {
                        fs.mkdirSync(newPath, { recursive: true });
                    }

                    // Delete file if it in folder
                    if(fs.existsSync(imagePath)){
                        fs.unlink(req.user.avatar, (err) => {
                            if (err) {
                                console.log("failed to delete local image:" + err);
                            } else {
                                console.log("Successfuly deleted local image");
                            }
                        });
                    }

                    imagePath = newPath + `/${imagePost.originalname}`;
                    fs.renameSync(imagePost.path, imagePath);
                }

                // Vaidator URL Youtube
                if (video && !validateUrlYoutube(video)) {
                    return res.end(
                        JSON.stringify({
                            code: 0,
                            message: "URL error",
                            error: "Invalid url youtube",
                        })
                    );
                } else {
                    // Update posts
                    await Posts.findOneAndUpdate(
                        { _id: _idPost },
                        {
                            content: content,
                            image: imagePath,
                            video: video,
                        }
                    );

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
                    message: "ERROR",
                    error: error,
                })
            );
        }

    }

    deletePost(req, res){
        let _idPost = req.params._id;

        Posts.findOneAndDelete({_id: _idPost}, (error, result) => {
            if(error){
                return res.end(
                    JSON.stringify({
                        code: 0,
                        message: "Delete Error",
                        error: error,
                    })
                );
            }else{
                // Delete all comments in post
                // result.comment.forEach(_idComment => {
                //     Comment.findOneAndDelete({_id: _idComment})
                // });

                return res.end(
                    JSON.stringify({
                        code: 1,
                        message: "Delete successfully",
                        result: true,
                    })
                );
            }
        });
    }
}

module.exports = new PostsController();