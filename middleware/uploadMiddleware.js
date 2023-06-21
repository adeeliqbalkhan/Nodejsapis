const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'YOUR_S3_REGION'
});

const s3 = new AWS.S3();


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