const bcrypt = require("bcrypt");
const {LocalUser, GoogleUser} = require('../models/UserModel');
const upload = require("../middlewares/upload/UploadImage");
const fs = require("fs");


class ProfileController {

    // Render view /profile
    index(req, res){
        return res.render('profile')
    }

    // Render view /profile/password
    password(req,res){
        let message = (req.flash("message")[0]);
        return res.render("password", { message: message });
    }

    edit(req,res){
        let message = req.flash("message")[0];
        return res.render("editProfile", {user: req.user, message: message });
    }

    // Change password for division role
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
                bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS), async (error, hash) => {
                    if (error) {
                        console.log(error);
                        req.flash("message", "Something wrong when change your password");
                        return res.redirect("/profile/password");
                    }

                    await LocalUser.findOneAndUpdate({ authId: req.user.authId }, { password: hash });
                    req.flash("message", "Update successfully");
                    return res.redirect("/profile/password");
                });
            }
        } catch (error) {
            req.flash("changePassword", error);
            return res.redirect("/profile/password");
        }
    }

    // Edit profile for student role
    editProfile(req, res){
        try {
            let handler = upload.single('avatar');
            handler(req, res, async error => {
                let imagePath = req.user.avatar;
                let avatar = req.file;

                if(error){
                    req.flash("message", "Image is to large!");
                    return res.redirect("/profile/edit");
                }
                if(avatar){
                    // Get authId except google or local
                    let folder = (req.user.authId.substring(0, 6) == "google") ? req.user.authId.substring(7) : req.user.authId.substring(6);
                    
                    let newPath = `uploads/${folder}`;
                    if(!fs.existsSync(newPath)){
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
                return res.redirect("/profile/password");
            });
        }
        catch (error) {
            return res.end(error);
        }
    }
}

module.exports = new ProfileController();