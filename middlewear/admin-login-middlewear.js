const jwt = require("jsonwebtoken")

module.exports.isLoggedIn = async function (req, res, next) {
    try {
        if (!req.cookies.adminToken) return res.send("you mus login first")

        jwt.verify(req.cookies.adminToken, process.env.JWT_SECRET, function (err, decoded) {
            req.user = decoded
            next()
        })
    }
    catch (err) {
        res.send(err)
    }

}