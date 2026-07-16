/**
 * checks if the authenticated user has one of the required roles
 *
 * @param {...string} roles
 * @returns {Function}
 */
function requireRole(...roles) {
    return (req, res, next) => {
        // req.user was already set in verifyToken
        if (!req.user) {
            return res.status(401).json({
                message: "Nicht authentifiziert."
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Keine Berechtigung."
            });
        }

        next();
    };
}

module.exports = requireRole;