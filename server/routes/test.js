const express = require('express');
const router = require('express-promise-router')();

const TestController = require('../controllers/test');

router.route('/tests')
    .get(TestController.getTests)
    .post(TestController.postTest)

router.route('/test/:id')
    .get(TestController.getTest)
    .delete(TestController.deleteTest)
    .put(TestController.putTest)

module.exports = router;
