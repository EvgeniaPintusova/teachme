const Tests = require('../models/Tests');

const responseHelper = (res, err, doc) => {
    if (err) {
        return res.status(500).json(err)
    }
    if (!doc) {
        return res.status(500).json('empty')
    }
    return res.status(200).json(doc)
}

module.exports = {
    getTests: (req, res) => {
        Tests.find((err, doc) => responseHelper(res, err, doc))
    },
    postTest: (req, res) => {
        const { body } = req;
        const test = new Tests(body)
        test.save();
        return res.status(201).json(test)
    },
    deleteTest: (req, res) => {
        const { id } = req.params;
        Tests.findByIdAndRemove(
            { _id: id },
            (err, doc) => responseHelper(res, err, doc)
        )
    },
    getTest: (req, res) => {
        const { id } = req.params;
        Tests.findById(
            { _id: id },
            (err, doc) => responseHelper(res, err, doc)
        )
    },
    putTest: (req, res) => {
        const { id } = req.params;
        const { name, answers } = req.body;
        Tests.findByIdAndUpdate(
            { _id: id },
            {
                $push: {
                    havePassed: {
                        name,
                        answers,
                    }
                }
            },
            {new : true},
            (err, doc) => responseHelper(res, err, doc)
        )
    }
}