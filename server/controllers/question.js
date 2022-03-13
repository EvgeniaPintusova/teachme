const Test = require("../models/Tests");
const Question = require("../models/Question");

const responseHelper = (res, err, doc) => {
  if (err) {
    return res.status(500).json(err);
  }
  if (!doc) {
    return res.status(500).json("empty");
  }
  return res.status(200).json(doc);
};

const difference = (array1, userArr) => {
  const filterArr = array1.filter(answer => !userArr.includes(answer));
  return { 
    arr: userArr,
    isRight: filterArr.length === 0 && array1.length === userArr.length
  }
};

module.exports = {
  getQuestions: (req, res) => {
    const { id } = req.params;
    Test.findById({ _id: id }, (err, doc) => {
      if (doc) responseHelper(res, err, {
        questions: doc.questions,
        title: doc.title,
        description: doc.description
      });
      else res.status(500).json(err);
    });
  },

  postQuestion: (req, res) => {
    const {
      body,
      params: { id }
    } = req;
    const newQuestion = new Question(body);
    Test.findById({ _id: id }, (err, doc) => {
      doc.questions.push(newQuestion);
      doc.save();
      if (err) res.status(500).json(err);
    });
    newQuestion.save();
    res.status(200).json(newQuestion);
  },
  deleteQuestion: (req, res) => {
    const { id, quest } = req.params;
    Test.updateOne(
      { _id: id },
      {
        $pull: {
          questions: quest
        }
      },
      { multi: true },
      () => {
        Question.findByIdAndRemove({ _id: quest }, (err, doc) => {
          responseHelper(res, err, doc);
        });
      }
    );
  },

  getQuestion: (req, res) => {
    const { quest } = req.params;
    Question.findById(
      quest,
      "question answers isText isOpenQuestion  rightAnswers",
      (err, doc) => {
        if (doc) {
          responseHelper(res, err, {
            ...doc._doc,
            rightAnswers: doc.rightAnswers.length,
            answers: doc._doc.answers.map(x => ({ answer: x.answer, id: x.id }))
          });
        } else {
          res.status(500).json(err);
        }
      }
    );
  },

  checkAnswers: (req, res) => {
    const {
      params: { quest },
      body: { userAnswer }
    } = req;
    Question.findById(
      quest,
      "isOpenQuestion answers rightAnswers",
      (err, doc) => {
        if (doc) {
          if (doc.isOpenQuestion) {
            if (
              doc.rightAnswers[0].trim().toLowerCase() ===
              userAnswer[0].trim().toLowerCase()
            ) {
              return responseHelper(res, err, {
                isRight: true,
              });
            } else {
              return responseHelper(res, err, {
                mistake: [doc.answers[0].mistake],
                isRight: false
              });
            }
          }
          const diff = difference(doc.rightAnswers, userAnswer);
          const isRight = diff.isRight;
          responseHelper(res, err, {
            mistake: doc.answers
              .filter(a => diff.arr.includes(a.id))
              .map(a => a.mistake),
            isRight
          });
        } else responseHelper(res, err, doc);
      }
    );
  }
};
