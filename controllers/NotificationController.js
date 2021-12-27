const Noti = require("../models/NotificationModel");
const uploadFile = require("../middlewares/upload/UploadNotiFile");
const fs = require("fs");
const Socket = require("../socket/Socket");

class Notification {
    indexAdmin(req, res) {
        try {
            Noti.find()
                .populate("createBy")
                .exec(function (error, noti) {
                    if (error) {
                        let message = "Error when get data";
                        return res.render("notify", { message: message });
                    }
                    // Message from create, update method
                    let message = req.flash("message");
                    return res.render("notify", { notification: noti, message: message });
                });
        } catch (error) {
            let message = "Error: " + error;
            return res.render("notify", { message: message });
        }
    }

    indexDivision(req, res) {
        try {
            Noti.find({ createBy: req.user._id, division:{$ne: null} })
                .populate("createBy")
                .exec(function (error, noti) {
                    if (error) {
                        console.log(error);
                        let message = "Error when get data";
                        return res.render("notify", { message: message });
                    }
                    // Message from create, update method
                    let message = req.flash("message")
                    return res.render("notify", { notification: noti, message: message });
                });
        } catch (error) {
            console.log(error);
            let message = "Error: " + error;
            return res.render("notify", { message: message });
        }
    }

    createNotiView(req, res) {
        let message = req.flash("message");
        return res.render("createNotify", { user: req.user, message: message });
    }

    updateNotiView(req, res){
        let _idNoti = req.params._id;
        Noti.findOne({ _id: _idNoti })
            .populate("createBy")
            .exec((error, result) => {
                if (error) {
                    req.flash("message", error);
                    return res.redirect("/noti");
                } else {
                    console.log(result)
                    let message = req.flash("message");
                    return res.render("updateNoti", {notification: result, message: message });
                }
            });
    }

    createNoti(req, res) {
        let handler = uploadFile.array("files", 10);
        handler(req, res, async (error) => {
            let files = req.files;
            if (error) {
                console.log("ERROR:", error);
                req.flash("message", error);
                return res.redirect("/noti/create");
            }

            if (files) {
                // Get authId after local
                let folder = req.user.authId.substring(6);

                // Create path if it isnt existed
                let newPath = `uploads/${folder}/notifications`;
                if (!fs.existsSync(newPath)) {
                    fs.mkdirSync(newPath, { recursive: true });
                }

                // Upload each file
                let filesPath = [];
                files.forEach((file) => {
                    let filePath = newPath + `/${file.originalname}`;
                    fs.renameSync(file.path, filePath);

                    filesPath.push(filePath);
                });

                //Upload to databse
                let { title, body, division } = req.body;
                await Noti.create(
                    {
                        createBy: req.user._id,
                        division: division,
                        title: title,
                        body: body,
                        filePath: filesPath,
                    },
                    function (error, result) {
                        if (error) {
                            console.log("ERROR:", error);
                            req.flash("message", error);
                            return res.redirect("/noti/create");
                        } else {
                            console.log("Result: ", result);

                            // Get io and notify to client except creator
                            const io = req.app.get("socketio");
                            io.sockets.emit("notify", result);

                            req.flash("message", "Create successfully");
                            
                            return res.redirect("/noti");
                        }
                    }
                );
            }
        });
    }

    updateNoti(req, res) {
        let _idNoti = req.params._id;

        try {
            // Get old file path noti
            let oldNoti = Noti.findOne({_id: _idNoti});
            let filesPath = oldNoti.filePath;
            console.log(filesPath);

            let handler = uploadFile.array("files", 10);
            handler(req, res, async (error) => {
                let files = req.files;
                if (error) {
                    console.log("ERROR:", error);
                    req.flash("message", error);
                    return res.redirect(`/noti/edit/${_idNoti}`);
                }

                if (files) {
                    // Get authId after local
                    let folder = req.user.authId.substring(6);

                    // Create path if it isnt existed
                    let newPath = `uploads/${folder}/notifications`;
                    if (!fs.existsSync(newPath)) {
                        fs.mkdirSync(newPath, { recursive: true });
                    }

                    // Upload each file
                    filesPath = [];
                    files.forEach((file) => {
                        let filePath = newPath + `/${file.originalname}`;
                        fs.renameSync(file.path, filePath);

                        filesPath.push(filePath);
                    });

                    //Upload to databse
                    let { title, body, division } = req.body;
                    Noti.findOneAndUpdate(
                        { _id: _idNoti },
                        {
                            division: division,
                            title: title,
                            body: body,
                            filePath: filesPath,
                        },
                        function (error, result) {
                            if (error) {
                                console.log("UPDATE ERROR: ", error);
                                req.flash("message", "Something wrong when update");
                                return res.redirect(`/noti/edit/${_idNoti}`);
                            } else {
                                console.log("Result: ", result);
                                req.flash("message", "Update successfully");
                                return res.redirect("/noti");
                            }
                        }
                    );
                }
            });

        } catch (error) {
            console.log("CATCH ERROR: ", error);
            req.flash("message", "Something wrong when update");
            return res.redirect(`/noti/edit/${_idNoti}`);
        }
    }

    deleteNoti(req, res) {
        let _idNoti = req.params._id;

        try {
            Noti.findOneAndDelete({_id: _idNoti}, (error, result) => {
                if (error) {
                    console.log("DELETE ERROR: ", error);
                    req.flash("message", "Something wrong when delete");
                    return res.redirect(`/noti`);
                } else {
                    req.flash("message", "Delete successfully");
                    return res.redirect("/noti");
                }
            })
        } catch (error) {
            console.log("CATCH ERROR: ", error);
            req.flash("message", "Something wrong when delete");
            return res.redirect(`/noti`);
        }
    }
}

module.exports = new Notification();