const express = require("express");
const router = express.Router();

const { registerUser, loginUser, currentUser, updateUser, getUser, RemoveUser } = require("../Controllers/userController");
// const validateToken = require('../middleware/validateTokenHandler')



router.post('/register', registerUser);

router.post('/login', loginUser);
router.put('/update', updateUser);
router.get('/getinfo', getUser);
router.delete('/remove', RemoveUser);
// router.get('/current', validateToken, currentUser);

module.exports = router;