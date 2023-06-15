
const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authentication;
    if (authHeader && authHEader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not Authorized!")

            }
            req.user = decoded.user;
            next();
        })
        if (!token) {
            res.status(401);
            throw new Error("Token is missing in the request!");
        }
    }


};
module.exports = validateToken;  