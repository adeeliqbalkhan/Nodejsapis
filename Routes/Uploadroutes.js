const express = require('express');
const router = express.Router();

const uploadFile = require('../controller/uploadController');

// Define the route for file upload
router.post('/image', uploadFile);

module.exports = router;
