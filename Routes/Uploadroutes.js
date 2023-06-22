const express = require('express');
const router = express.Router();

const uploadMiddleware = require('../middleware/uploadMiddleware');
const uploadController = require('../controller/uploadController');

// Define the route for file upload
router.post('/upload', uploadMiddleware, uploadController);

module.exports = router;
