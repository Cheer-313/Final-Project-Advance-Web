const bcrypt = require("bcrypt");
const {LocalUser, GoogleUser} = require('../models/UserModel');
const upload = require("../middlewares/upload/UploadImage");
const fs = require("fs");
const faculty = require("../const/faculty");
const { profile } = require("console");
const Posts = require("../models/PostsModel");
const { populate } = require("../models/PostsModel");


class ProfileController {

    // Render view /profile
    async index(req, res){
        let message = req.flash("message")[0];
        let authId = req.params.authId;
        if (authId) {
            let typeUser = authId.substring(0, 6) == "google" ? "google" : "local";

            if(typeUser === "google"){
                let googleUser = await GoogleUser.findOne({ authId: authId });

                let posts = await Posts.find({ postedBy: googleUser._id })
                    .populate("postedBy")
                    .populate({ path: "comment", populate: { path: "commentBy" } })
                    .sort({ date: "desc" });

                return res.render("profile", { title: googleUser.fullname, profileUser: googleUser, currentUser: req.user, faculty: faculty, posts: posts });
            } else if( typeUser === "local"){
                let localUser = await LocalUser.findOne({ authId: authId });

                let posts = await Posts.find({ postedBy: localUser._id })
                    .populate("postedBy")
                    .populate({ path: "comment", populate: { path: "commentBy" } })
                    .sort({ date: "desc" });

                return res.render("profile", { title: localUser.fullname, profileUser: localUser, currentUser: req.user, faculty: faculty, posts: posts });
            }
        }
        let posts = await Posts.find({ postedBy: req.user._id })
            .populate("postedBy")
            .populate({ path: "comment", populate: { path: "commentBy" } })
            .sort({ date: "desc" });
        console.log(posts);
        return res.render("profile", { title: req.user.fullname, profileUser: req.user, message: message, faculty: faculty, currentUser: req.user, posts: posts });
    }

    // Render view /profile/password
    password(req,res){
        let message = (req.flash("message")[0]);
        return res.render("changePassword", {title: "Thay đổi mật khẩu", message: message });
    }

    changePassword(req, res){
        try {
            let{password, newPassword, confirmPassword} = req.body;

            if(newPassword !== confirmPassword){
                req.flash("message", "Your confirm password does not match");
                return res.redirect("/profile/password");
            }

            // Check current password with database password
            let result = bcrypt.compareSync(password, req.user.password);
            console.log(result);
            if(!result){
                req.flash("message", "Your current password is incorrect");
                return res.redirect("/profile/password");
            }
            else{
                // Update new password
                bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS), async (error, hash) => {
                    if (error) {
                        console.log(error);
                        req.flash("message", "Something wrong when change your password");
                        return res.redirect("/profile/password");
                    }

                    await LocalUser.findOneAndUpdate({ authId: req.user.authId }, { password: hash });
                    req.flash("message", "Update successfully");
                    return res.redirect("/profile");
                });
            }
        } catch (error) {
            req.flash("message", error);
            return res.redirect("/profile");
        }
    }

    // Edit profile for student role
    editProfile(req, res){
        try {
            let handler = upload.single("avatar");
            handler(req, res, async (error) => {
                // Get old path of avatar
                let imagePath = req.user.avatar;

                let avatar = req.file;

                console.log(avatar);

                if (error) {
                    req.flash("message", "Image is to large!");
                    return res.redirect("/profile/edit");
                }
                if (avatar) {
                    // Get authId except google or local
                    let folder = req.user.authId.substring(0, 6) == "google" ? req.user.authId.substring(7) : req.user.authId.substring(6);

                    let newPath = `/uploads/${folder}`;
                    if (!fs.existsSync(newPath)) {
                        fs.mkdirSync(newPath);
                    }

                    imagePath = newPath + `/${avatar.originalname}`;

                    fs.unlink(req.user.avatar, (err) => {
                        if (err) {
                            console.log("failed to delete local image:" + err);
                        } else {
                            console.log("successfully deleted local image");
                        }
                    });

                    fs.renameSync(avatar.path, imagePath);
                }

                let { fullname, classname, faculty } = req.body;
                await GoogleUser.findOneAndUpdate(
                    { authId: req.user.authId },
                    {
                        fullname: fullname,
                        class: classname,
                        faculty: faculty,
                        avatar: imagePath,
                    }
                );
                req.flash("message", "Update successfully");
                return res.redirect("/profile");
            });
        }
        catch (error) {
            req.flash("message", error);
            return res.redirect("/profile");
        }
    }
}

module.exports = new ProfileController();