const express = require('express');
const multer = require('multer');



// Define storage configuration
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + "-" + Date.now() + ".jpg")
        }
    })
}).single("user_file")



module.exports = { upload } 