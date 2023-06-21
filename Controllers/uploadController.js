const express = require('express');
const multer = require('multer');
const { S3Client } = require("@aws-sdk/client-s3")

//instance of S3Client
const s3Client = new S3Client({
    region: 'YOUR_S3_REGION',
    credentials: {
        accessKeyId: 'YOUR_ACCESS_KEY_ID',
        secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
    }
});

function uploadToS3(file) {
    const params = {
        Bucket: 'YOUR_S3_BUCKET_NAME',
        Key: file.originalname + "-" + Date.now() + ".jpg",
        Body: file.buffer
    };
    const command = new PutObjectCommand(params);
    s3Client.send(command);
}

// Use the Multer middleware for file upload

const uploadImage = (req, res) => {
    try {
        const uploadedFile = uploadToS3(req.file);
        res.status(200).send("File uploaded successfully");
    } catch (error) {
        res.status(500).send("Error uploading file to S3");
    }
};

module.exports = { uploadImage }
//