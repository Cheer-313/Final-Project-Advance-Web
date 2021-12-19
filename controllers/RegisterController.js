const upload = require("../middlewares/upload/UploadImage");
const uuid = require("short-uuid");
const fs = require("fs");
const {LocalUser} = require("../models/UserModel");
const bcrypt = require("bcrypt");

class RegisterController {
    index (req, res){
        return res.render('register');
    }

    register(req, res){
        let handler = upload.single('avatar');
        handler(req, res, error => {
            let avatar = req.file;

            if(error){
                return res.end("Image to large");
            }
            if(!avatar){
                return res.end("Invalid image")
            }
            else{
                let authId = uuid.generate();
                let {username, password, fullname, role} = req.body;

                let imagePath = `uploads/${authId}/${avatar.originalname}`;
                fs.renameSync(avatar.path, imagePath);

                bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), async (error, hash) => {
                    if (error) {
                        return res.redirect("/error");
                    }

                    await LocalUser.create({
                        authId: "local:" + authId,
                        username: username,
                        password: hash,
                        fullname: fullname,
                        avatar: imagePath,
                        role: role,
                    });

                    return res.end("OK");
                });
            }
        })
    }
}

module.exports = new RegisterController();