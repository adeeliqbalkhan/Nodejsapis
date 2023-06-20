const express = require("express");
const router = express.Router();

const { upload, uploadImage } = require('../Controllers/uploadController');

router.post('/image', upload);

module.exports = router