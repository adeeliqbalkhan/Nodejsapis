const express = require("express");
const router = express.Router();

const { upload, uploadImage } = require('../uploads/Uploadcontroller');

router.post('/image', upload, uploadImage);

module.exports = router