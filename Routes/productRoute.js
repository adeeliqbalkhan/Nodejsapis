const express = require('express');
const router = express.Router();

const addProduct = require('../controller/productController');

router.post('/', addProduct);

module.exports = router;