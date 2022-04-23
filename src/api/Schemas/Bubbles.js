const mongoose = require('mongoose')

const Bubble = new mongoose.Schema({
    idea: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    image: {
        contentType: String,
        data: Buffer
    },
    url: {
        type: String
    }, 
    description: {
        type: String
    },
    note: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = new mongoose.model('Bubble', Bubble)