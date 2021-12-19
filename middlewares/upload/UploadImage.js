const multer = require("multer");

const uploadImage = multer({
    dest: "uploads",
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith("image/")) {
            callback(null, true);
        } else callback(null, false);
    },

    limits: { fileSize: 5000000 },  // Limit: 1 Mb
});

module.exports = uploadImage;