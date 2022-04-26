const mongoose = require('mongoose')

const Tags = new mongooseSchema({
    text: {
        type: String,
        required: true,
        unique: true, 
    }
})