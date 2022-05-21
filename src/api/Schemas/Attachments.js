const mongoose = require('mongoose')

const Attachments = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    item: {
        type: Buffer,
        contentType: String,
        fileName: String
    }
})