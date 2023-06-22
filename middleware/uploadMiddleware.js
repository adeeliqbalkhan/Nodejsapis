const express = require('express');
const multer = require('multer');

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware function to handle file upload
const uploadMiddleware = upload.single('file');

module.exports = uploadMiddleware;
