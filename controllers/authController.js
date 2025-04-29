const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const jwt = require("jsonwebtoken");
const UserSessions = require('../models/UserSessions');

function generateAccessToken(user) {
    return jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10d' })
}

function generateRefreshToken(user) {
    return jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.REFRESH_TOKEN_SECRET)
}

exports.registerController = async (req, res) => {
    const { name, email, password } = req.body
    console.log("BODY", { name, email, password })

    try {
        const findUser = await Users.findOne({ email })
        if (findUser) {
            res.json({ success: false, data: "User with the email already exists!" })
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            const data = { name, email, password: hashPassword }
            await Users.create(data)
            res.json({ success: true, data: "Registration Successful!" })
        }
    }
    catch (error) {
        console.log("ERR")
        res.status(500).json(error)
    }
}


exports.loginController = async (req, res) => {
    const { email, password } = req.body
    console.log("BODY", { email, password })

    try {
        const user = await Users.findOne({ email })
        if (user && user.email === email) {
            const compare = bcrypt.compareSync(password, user.password)
            if (!compare) {
                res.json({ success: false, data: "Password doesn't match" })
            }
            else {
                const accessToken = generateAccessToken(user)
                const refreshToken = generateRefreshToken(user)
                await UserSessions.create({ accessToken, refreshToken, email: user.email })
                // res.cookie('accessToken', accessToken, {
                //     httpOnly: true,
                //     secure: process.env.NODE_ENV === 'production',
                //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                //     maxAge: 1 * 24 * 60 * 60 * 1000
                // })
                res.json({ success: true, accessToken, refreshToken, user: { id: user._id, email: user.email } })
            }
        }
        else {
            res.json({ success: false, data: "User not found" })
        }
    }
    catch (error) {
        console.log("ERR", error)
        res.status(500).json(error)
    }
}

exports.handleAccessToken = async (req, res) => {
    const token = req.headers.authorization;
    console.log("TOKEN", token)
    if (!token) {
        return res.json({ success: false, data: 'Unauthorized request' })
    }

    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

    const user = await Users.findById(decodedToken._id)
    if (!user) {
        return res.json({ success: false, data: 'Invalid refresh token' })
    }

    res.json({ success: true, data: generateAccessToken(user) })
}