const upload = require("../middlewares/upload/UploadImage");
const uuid = require("short-uuid");
const fs = require("fs");
const {LocalUser} = require("../models/UserModel");
const bcrypt = require("bcrypt");
const moment = require("moment");

class RegisterController {
    index (req, res){
        let message = req.flash("message");
        return res.render("createAccount", { title: "Tạo tài khoản", message: message });
    }

    register(req, res){
        let handler = upload.single('avatar');
        handler(req, res, error => {
            let avatar = req.file;
            let authId = uuid.generate();
            let { username, password, fullname, role } = req.body;

            // Set default avatar path
            let imagePath = "/uploads/default/user.png";

            if(error){
                req.flash("message", error);
                return res.redirect("/register");
            }
            if(avatar){
                let newPath = `/uploads/${authId}/avatar`;
                if (!fs.existsSync(newPath)) {
                    fs.mkdirSync(newPath);
                }
                imagePath = newPath + `/${avatar.originalname}`;

                fs.renameSync(avatar.path, imagePath);
            }

            // Hash password and register
            bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), async (error, hash) => {
                if (error) {
                    req.flash("message", error);
                    return res.redirect("/register");
                }

                await LocalUser.create(
                    {
                        authId: "local:" + authId,
                        username: username,
                        password: hash,
                        fullname: fullname,
                        avatar: imagePath,
                        role: role,
                        time: moment.utc().local(),
                    },
                    function (error, result) {
                        if (error) {
                            req.flash("message", error);
                            return res.redirect("/register");
                        } else {
                            req.flash("Create successfully");
                            return res.redirect("/");
                        }
                    }
                );
            });
        })
    }
}

module.exports = new RegisterController();