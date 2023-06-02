// middleware - auth.js
 module.exports = {
    requireAuth : (req, res, next) => {
        if (req.isAuthenticated()) {
            next()
        } else {
            res.status(401).send()
        }
    },
}
