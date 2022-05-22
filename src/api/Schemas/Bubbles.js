const mongoose = require('mongoose')
const MAX_ATTACHMENT = '3'

// should allow image, video, audio, and other form of documents. 
const Bubble = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        auto: true
    },
    author: {
        type: String,
        required: true
    },
    idea: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    attachments: {
        type: [{
            contentType: mongoose.SchemaTypes.Mixed,
            data: mongoose.SchemaTypes.Mixed,
            name: mongoose.SchemaTypes.Mixed
        }],
        validate: [(val) => val.length <= MAX_ATTACHMENT, 'Cannot exceed ' + MAX_ATTACHMENT + ' items.']
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
}, {
    _id: false
})

module.exports = new mongoose.model('Bubble', Bubble)