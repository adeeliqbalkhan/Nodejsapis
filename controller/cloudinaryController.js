const multer = require('multer');
const cloudinary = require("cloudinary").v2;

const uploader = multer({ dest: "uploads/" });

// Initialize Cloudinary
cloudinary.config({
  cloud_name: "db1vywpdz",
  api_key: "735623758789829",
  api_secret: "zM5cahKMmRCVgvNR-PDsIFrRGBQ"
});

const uploadFile = async (req, res) => {
  uploader.single('file')(req, res, (err) => {
    if (err) {
      // Other error occurred
      console.error(err);
      return res.status(500).json({ error: "Failed to upload file" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;

    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to upload file" });
      }

      // File uploaded successfully
      res.json({ success: true, file: result.secure_url });
    });
  });
};

module.exports = uploadFile;
