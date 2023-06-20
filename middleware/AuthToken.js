
const jwt = require("jsonwebtoken");
const User = require('../model/userModel');

const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "User is not Authorized!" })
            }
            req.user = decoded.user;
            const user = await User.findOne({ _id: decoded.user.id });
            if (token !== user.token) {
                res.status(401).json({ message: "Token has expired, Please use your new token!" });
                return;
            }
            next();
        })
    }
    else {
        res.status(401).json({ message: "Token is missing in the request!" });
    }
};
module.exports = validateToken;  