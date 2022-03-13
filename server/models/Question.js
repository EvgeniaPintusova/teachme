const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    isOpenQuestion: {
        type: Boolean,
        default: false,
    },
    isText: {
        type: Boolean,
        default: false,
    },
    question: String,
    rightAnswers: [String],
    answers: [{
        id: String,
        answer: String,
        mistake: String
    }]
})

module.exports = mongoose.model('Question', QuestionSchema);