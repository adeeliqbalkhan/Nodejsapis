// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// // Configure S3 client
// const s3Client = new S3Client({
//     // Add your AWS credentials and configuration options here
//     region: '<YOUR_REGION>',
//     credentials: {
//         accessKeyId: '<YOUR_ACCESS_KEY>',
//         secretAccessKey: '<YOUR_SECRET_ACCESS_KEY>',
//     },
// });

// // API endpoint to handle file upload
// const uploadFile = async (req, res) => {
//     const file = req.file;

//     if (!file) {
//         return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     const params = {
//         Bucket: '<YOUR_BUCKET_NAME>',
//         Key: file.originalname,
//         Body: file.buffer,
//     };

//     try {
//         // Upload file to S3 bucket
//         const command = new PutObjectCommand(params);
//         const response = await s3Client.send(command);
//         res.json({ message: 'File uploaded successfully.', url: response.Location });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Error uploading file.' });
//     }
// };

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const uploader = multer({ dest: "uploads/" });
const User = require('../model/userModel');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadFile = async (req, res) => {
    uploader.single('file')(req, res, (err) => {
        if (err) {
            // Other error occurred
            console.log(err);
            return res.status(500).json({ error: "Failed to upload file" });
        }
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const filePath = req.file.path;

        cloudinary.uploader.upload(filePath, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Failed to upload file" });
            }

            // File uploaded successfully
            res.json({ message: 'file uploaded successfully!', file: result.secure_url });
        });
    });
};

module.exports = uploadFile;



