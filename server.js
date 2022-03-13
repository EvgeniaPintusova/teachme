const Question = require("./server/models/Question");
const Tests = require("./server/models/Tests");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(cors());

app.use("/api/", require("./server/routes/test"));
app.use("/api/", require("./server/routes/question"));
app.use("/api/user", require("./server/routes/user"));

const db = process.env.mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongo connected"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

// const test = new Tests({
//   title: "Sirotina Test",
//   description: "Some test written by Sirotina",
//   _creator: "Sirota",
//   questions: ["621a28e74e82200d5c124a4d", "621a28a162dc210c44fe378a"],
//   havePassed: [
//     {
//       name: "Stas",
//     },
//   ],
// });
// test.save().then(() => console.log("TEST SAVED!));

// const question = new Question(
// {   isOpenQuestion: false,
//     isText: false,
//     rightAnswers: 1,
//     _id: "5cd0c030b59db618a0752da7",
//     question: "Which of the following sentences contains a <i>progressive verb phrase?</i>",
//     answers: [
//         {   "answer": "I am not happy.",
//             "id": "67492390"},
//         {   "answer": "I am not eating now.",
//             "id": "69026743"},
//         {   "answer": "I do not go by subway.",
//             "id": "64352563"}    ] }
// );
// question.save().then(() => console.log(" QUESTION SAVED!!!"));

// {   "isOpenQuestion": false,
//     "isText": false,
//     "rightAnswers": 1,
//     "_id": "5cd0c030b59db618a0752da7",
//     "question": "Which of the following sentences contains a <i>progressive verb phrase?</i>",
//     "answers": [
//         {   "answer": "I am not happy.",
//             "id": "67492390"},
//         {   "answer": "I am not eating now.",
//             "id": "69026743"},
//         {   "answer": "I do not go by subway.",
//             "id": "64352563"}    ] }
// Свойство rightAnswers хранит в себе количество верных ответов, а при создании вопроса сам верный ответ. Свойство с именем answers содержит строковые значения ответов, где answer содержит сам ответ, а id это id номер ответа