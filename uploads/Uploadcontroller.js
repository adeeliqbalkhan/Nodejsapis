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

// Use the Multer middleware for file upload
const uploadImage = (req, res) => {
    console.log(req.file)
    res.json({
        success: 1,
        profile_url: 'http://6000/upload/${req.file.filename}'

    })
};

module.exports = { upload, uploadImage }