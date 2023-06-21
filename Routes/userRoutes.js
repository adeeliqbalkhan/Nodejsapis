const express = require("express");
const router = express.Router();

const { registerUser, loginUser, updateUser, getUser, removeUser } = require("../controllers/userController");
const validateToken = require('../middleware/authToken')



router.post('/register', registerUser);

router.post('/login', loginUser);
router.put('/update', validateToken, updateUser);
router.get('/getinfo', validateToken, getUser);
router.delete('/remove', validateToken, removeUser);

module.exports = router;