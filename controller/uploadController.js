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
    uploader.single('file')(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to upload file" });
        }
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const filePath = req.file.path;

        cloudinary.uploader.upload(filePath, async (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Failed to upload file" });
            }

            // File uploaded successfully
            const imageUrl = result.secure_url;

            // Update the user's profilePic field with the imageUrl in the database
            const userId = req.params.userId;
            try {
                const user = await User.findOne({ _id: userId });
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }

                user.profilePic = imageUrl;
                await user.save();

                res.json({ message: 'File uploaded successfully!', file: imageUrl });
            } catch (err) {
                console.log("Error:", err);
                return res.status(500).json({ error: "Failed to save image URL" });
            }
        });
    });
};



module.exports = uploadFile;
