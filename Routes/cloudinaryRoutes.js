const express = require('express');
const multer = require('multer');
const uploadFile = require('../controller/cloudinaryController');

const router = express.Router();

router.post('/image', uploadFile);

module.exports = router;
