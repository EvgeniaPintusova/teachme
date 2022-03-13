const mongoose = require('mongoose');

const TestsSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    _creator: {
        type: String,
        require: true,
    },
    questions: [{
        type: mongoose.Schema.ObjectId, 
        ref: 'Question'
    }],
    date: {
        type: Date,
        default: Date.now,
    },
    havePassed: [{
        name: String,
        data: {
            type: Date,
            default: Date.now,
        }
    }]
})

module.exports = mongoose.model('Tests', TestsSchema);
