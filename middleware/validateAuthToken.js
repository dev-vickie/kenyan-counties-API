const jwt = require("jsonwebtoken");
const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            req.user = decoded.user;
            next();
        console.log("Decoded user", decoded);

        })
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
}

module.exports = validateToken;