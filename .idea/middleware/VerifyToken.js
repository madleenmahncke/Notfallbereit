const jwt = require("jsonwebtoken");

/**
 * verifies a jwt and attaches the user to the request
 *
 * @param req
 * @param res
 * @param next
 * @returns {void}
 */
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            code: "NO_TOKEN",
            message: "Kein Token vorhanden."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            code: "TOKEN_EXPIRED",
            message: "Ungültiger oder abgelaufener Token."
        });
    }
}

module.exports = verifyToken;