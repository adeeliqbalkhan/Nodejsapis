const express = require('express');
const multer = require('multer');




// Use the Multer middleware for file upload
const uploadImage = (req, res) => {
    console.log(req.file)
    res.json({
        message: "File uploaded successfully!"

    })
};

module.exports = { uploadImage }