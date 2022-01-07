const Noti = require("../models/NotificationModel");
const uploadFile = require("../middlewares/upload/UploadNotiFile");
const fs = require("fs");
const moment = require("moment")

class Notification {
    notiView(req, res){
        try {
            let division = req.params.division;
            if(division){
                division = division.replace(/_/g, " ");
                console.log(division)
                Noti.find({division:division})
                    .populate("createBy")
                    .sort({ date: "asc" })
                    .exec(function (error, noti) {
                        if (error) {
                            let message = "Error when get data";
                            return res.render("notify", { title: "Thông báo", message: message });
                        }
                        console.log(noti)
                        // Message from create, update method
                        let message = req.flash("message");
                        return res.render("notify", { title: "Thông báo", notification: noti, message: message });
                    });
            } else {
                Noti.find()
                    .populate("createBy")
                    .sort({ date: "asc" })
                    .exec(function (error, noti) {
                        if (error) {
                            let message = "Error when get data";
                            return res.render("notify", { title: "Thông báo", message: message });
                        }
                        // Message from create, update method
                        let message = req.flash("message");
                        return res.render("notify", { title: "Thông báo", notification: noti, message: message });
                    });
            }
            
        } catch (error) {
            let message = "Error: " + error;
            return res.render("notify", { title: "Thông báo", message: message });
        }
    }

    detailNotiView(req, res){
        let _idNoti = req.params.path.split("-").pop();
        Noti.findOne({_id: _idNoti}).populate("createBy").exec((error, noti) =>{
            if (error) {
                    req.flash("message", error);
                    return res.redirect("/noti");
                } else {
                    let message = req.flash("message");
                    return res.render("notifyContent", {title: noti.title, notification: noti, message: message });
                }
        })
    }

    manageAdminView(req, res) {
        try {     
            Noti.find()
                .populate("createBy")
                .sort({ date: "desc" })
                .exec(async function (error, noti) {
                    if (error) {
                        let message = "Error when get data";
                        return res.render("manageNotify", { title: "Quản lý thông báo", message: message });
                    }
                    // Message from create, update method
                    let message = req.flash("message");
                    return res.render("manageNotify", { title: "Quản lý thông báo", notification: noti, message: message });
                });
        } catch (error) {
            let message = "Error: " + error;
            return res.render("manageNotify", {title: "Quản lý thông báo", message: message });
        }
    }

    manageDivisionView(req, res) {
        try {
            Noti.find({ createBy: req.user._id, division: { $ne: null } })
                .populate("createBy")
                .sort({ date: "desc" })
                .exec(async function (error, noti) {
                    if (error) {
                        console.log(error);
                        let message = "Error when get data";
                        return res.render("manageNotify", { title: "Quản lý thông báo", message: message });
                    }

                    // Message from create, update method
                    let message = req.flash("message");
                    return res.render("manageNotify", { title: "Quản lý thông báo", notification: noti, message: message})
                });
        } catch (error) {
            console.log(error);
            let message = "Error: " + error;
            return res.render("manageNotify", {title: "Quản lý thông báo", message: message });
        }
    }

    createNotiView(req, res) {
        let message = req.flash("message");
        return res.render("createNotify", {title: "Tạo thông báo", user: req.user, message: message });
    }

    updateNotiView(req, res){
        let _idNoti = req.params._id;
        Noti.findOne({ _id: _idNoti })
            .populate("createBy")
            .exec((error, result) => {
                if (error) {
                    req.flash("message", error);
                    return res.redirect("/noti/manage");
                } else {
                    console.log(result)
                    let message = req.flash("message");
                    return res.render("updateNotify", {title: "Cập nhật thông báo", notification: result, message: message });
                }
            });
    }

    createNoti(req, res) {
        try {
            let handler = uploadFile.array("files", 10);
            let filesPath = [];

            handler(req, res, async (error) => {
                let files = req.files;
                console.log(files);
                if (error) {
                    console.log("ERROR:", error);
                    req.flash("message", error);
                    return res.redirect("/noti/create");
                }

                if (typeof files != "undefined" && files.lengh > 0) {
                    console.log("FILES HERE", files);
                    // Get authId after local
                    let folder = req.user.authId.substring(0, 6) == "google" ? req.user.authId.substring(7) : req.user.authId.substring(6);

                    // Create path if it isnt existed
                    let newPath = `/uploads/${folder}/notifications`;
                    if (!fs.existsSync(newPath)) {
                        fs.mkdirSync(newPath, { recursive: true });
                    }

                    // Upload each file
                    files.forEach((file) => {
                        let filePath = newPath + `/${file.originalname}`;
                        fs.renameSync(file.path, filePath);

                        filesPath.push(filePath);
                    });
                }

                //Upload to databse
                let { title, body, division } = req.body;
                console.log(title, body, division)
                await Noti.create(
                    {
                        createBy: req.user._id,
                        division: division,
                        title: title,
                        body: body,
                        filePath: filesPath,
                        date: moment.utc().local()
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

                            return res.redirect("/noti/manage");
                        }
                    }
                );
            });
        } catch (error) {
            req.flash("message", error);
            return res.redirect("/noti/manage");
        }
    }

    updateNoti(req, res) {
        let _idNoti = req.params._id;

        try {
            // Get old file path noti
            let oldNoti = Noti.findOne({_id: _idNoti});
            let filesPath = oldNoti.filePath;

            let handler = uploadFile.array("files", 10);
            handler(req, res, async (error) => {
                let files = req.files;
                if (error) {
                    console.log("ERROR:", error);
                    req.flash("message", error);
                    return res.redirect(`/noti/edit/${_idNoti}`);
                }

                if (typeof files != "undefined" && files.lengh > 0) {
                    // Get authId after local
                    let folder = req.user.authId.substring(6);

                    // Create path if it isnt existed
                    let newPath = `/uploads/${folder}/notifications`;
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
                }

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
                            return res.redirect("/noti/manage");
                        }
                    }
                );
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
                    return res.redirect("/noti/manage");
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