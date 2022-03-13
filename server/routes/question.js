const express = require('express');
const router = require('express-promise-router')();

const QuestionController = require('../controllers/question');

router.route('/test/:id/question')
    .get(QuestionController.getQuestions)
    .post(QuestionController.postQuestion)

router.route('/test/:id/question/:quest')
    .post(QuestionController.checkAnswers)
    .delete(QuestionController.deleteQuestion)
    .get(QuestionController.getQuestion)

module.exports = router;
