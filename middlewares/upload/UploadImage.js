const multer = require("multer");

const uploadImage = multer({
    dest: "uploads",
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith("image/")) {
            callback(null, true);
        } else callback(null, false);
    },

    limits: { fileSize: 5242880 }, // Limit: 5 Mb
});

module.exports = uploadImage;