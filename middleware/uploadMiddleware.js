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

// Middleware to upload file to S3
function uploadToS3(file) {
    const params = {
        Bucket: 'YOUR_S3_BUCKET_NAME',
        Key: file.originalname + "-" + Date.now() + ".jpg",
        Body: file.buffer
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = { upload } 