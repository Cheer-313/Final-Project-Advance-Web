const multer = require("multer");
const path = require("path");
const extension = require("../../const/extension");

const uploadFile = multer({
    dest: "uploads",
    fileFilter: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        if (file.mimetype.startsWith("image/") || extension.includes(ext)) {
            callback(null, true);
        } else {
            let message = `Only image, ${extension.toString().replace(/,/g, ', ')} are allowed`;
            callback(message);
        };
    },

    limits: { fileSize: 26214400 }, // Limit: 25 Mb
});

module.exports = uploadFile;
