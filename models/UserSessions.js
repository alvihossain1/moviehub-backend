const mongoose = require("mongoose")

const userSessionsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("UserSessions", userSessionsSchema)