const express = require('express');
const multer = require('multer');




// Use the Multer middleware for file upload
const uploadImage = (req, res) => {
    console.log(req.file)
    res.json({
        success: 1,
        profile_url: 'http://6000/upload/${req.file.filename}'

    })
};

module.exports = { uploadImage }