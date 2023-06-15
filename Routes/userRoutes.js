const express = require("express");
const router = express.Router();

const { registerUser, loginUser, currentUser, updateUser, getUser, removeUser } = require("../Controllers/userController");
const validateToken = require('../middleware/AuthToken')



router.post('/register', registerUser);

router.post('/login', loginUser);
router.put('/update', updateUser);
router.get('/getinfo', validateToken, getUser);
router.delete('/remove', removeUser);

module.exports = router;