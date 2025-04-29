const mongoose = require("mongoose")

const moviesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ratings: {
        type: [{
            rate: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
                required: false,
            },
            userId: {
                type: String,
            },
            username: {
                type: String,
            },
            email: {
                type: String,
            },
        }]
    }
})

module.exports = mongoose.model("Movies", moviesSchema)