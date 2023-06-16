
const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "User is not Authorized!" })
            }
            req.user = decoded.user;
            next();
        })
    } else {
        res.status(401).json({ message: "Token is missing in the request!" });
    }


};
module.exports = validateToken;  