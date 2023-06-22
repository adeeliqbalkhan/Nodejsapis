const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Configure S3 client
const s3Client = new S3Client({
    // Add your AWS credentials and configuration options here
    region: '<YOUR_REGION>',
    credentials: {
        accessKeyId: '<YOUR_ACCESS_KEY>',
        secretAccessKey: '<YOUR_SECRET_ACCESS_KEY>',
    },
});

// API endpoint to handle file upload
const uploadFile = async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const params = {
        Bucket: '<YOUR_BUCKET_NAME>',
        Key: file.originalname,
        Body: file.buffer,
    };

    try {
        // Upload file to S3 bucket
        const command = new PutObjectCommand(params);
        const response = await s3Client.send(command);
        res.json({ message: 'File uploaded successfully.', url: response.Location });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error uploading file.' });
    }
};

module.exports = uploadFile;
