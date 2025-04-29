const jwt = require("jsonwebtoken");
const UserSessions = require("../models/UserSessions");
exports.authorizationCheck = async (req, res, next) => {
    const token = req.headers.authorization;
    let verify = false
    if (!token) {
        res.json({success: false, data: 'No token found' })
    }
    else {
        try {        
            let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded
            verify = true
            next()
        }
        catch (error) {
            console.log("ERR", error)
            res.json({success: false, data: 'Unauthorized user' })
        }
    }
    console.log("AUTH", verify ? 'verified' : 'not verified')
}