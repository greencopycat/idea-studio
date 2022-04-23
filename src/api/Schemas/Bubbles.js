const mongoose = require('mongoose')
const MAX_ATTACHMENT = '3'

// should allow image, video, audio, and other form of documents. 
const Bubble = new mongoose.Schema({
    id: {
        type: String,
        unique: [true, 'Id must be unique. Please check the value provided.'], 
        required: true
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
})

module.exports = new mongoose.model('Bubble', Bubble)