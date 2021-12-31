const Noti = require("../models/NotificationModel");
const uploadFile = require("../middlewares/upload/UploadNotiFile");
const fs = require("fs");
const moment = require("moment");

class ApiNotificationController {
    GetAll(req, res) {
        try {
            Noti.find({division: { $ne: null }})
                .limit(5)
                .populate("createBy")
                .sort({ date: "desc" })
                .exec(function (err, noti) {
                    if (err) {
                        return res.send(
                            JSON.stringify({
                                code: 0,
                                message: "Error",
                                error: err,
                            })
                        );
                    }
                    return res.send(
                        JSON.stringify({
                            code: 1,
                            message: "Success",
                            result: noti,
                        })
                    );
                });
        } catch (error) {
            return res.send(
                JSON.stringify({
                    code: 0,
                    message: "Catch Error",
                    error: error,
                })
            );
        }
    }
}

module.exports = new ApiNotificationController();
