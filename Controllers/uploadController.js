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

// Use the Multer middleware for file upload
const uploadImage = (req, res) => {
    if (err) {
        return res.status(500).json({ message: "Error Uploading file!" });
    }
    try {
        const uploadedFile = uploadToS3(req.file);
        res.status(200).send("File uploaded successfully");

    } catch (error) {
        res.status(500).send("Error uploading file to S3");
    }
};

module.exports = { uploadImage }