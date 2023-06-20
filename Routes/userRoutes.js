const express = require("express");
const router = express.Router();

const { registerUser, loginUser, updateUser, getUser, removeUser } = require("../Controllers/userController");
const validateToken = require('../middleware/AuthToken')



router.post('/register', registerUser);

router.post('/login', loginUser);
router.put('/update', validateToken, updateUser);
router.get('/getinfo', validateToken, getUser);
router.delete('/remove', validateToken, removeUser);

module.exports = router;