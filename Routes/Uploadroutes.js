const express = require("express");
const router = express.Router();

const { uploadImage } = require('../controllers/uploadController');
const { upload } = require('../middleware/uploadMiddleware')

router.post('/image', upload, uploadImage);

module.exports = router