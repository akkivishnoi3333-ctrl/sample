const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization
        if (bearerToken) {
            const token = bearerToken.split(" ")[1]
            const decode = await jwt.verify(token, "secretkey");
            if (decode) {
                req.userId = decode.userId
                next();
            } else {
                res.status(403).json({
                    message: "invalid token",

                })
            }

        } else {
            res.status(401).json({
                message: "unauthrized user",

            })
        }
    } catch (err) {
        res.status(400).json({
            message: err.message,
        })
    }
}
module.exports = verifyToken