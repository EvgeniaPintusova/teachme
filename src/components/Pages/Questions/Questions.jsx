import * as React from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./Questions.css";
import { Redirect } from "react-router-dom";

import {
  getQuestion,
  getQuestions,
  resetQuestions,
} from "../../../actions/questions";
import { animateError } from "../../../actions/tests";
import Loader from "../../Loading/Loading";
import Back from "../../Back/Back";
import Answers from "../../Answers/Answers";
import PopUp from "../../PopUp/PopUp";
import TitleQuestion from "../../TitleQuestion/TitleQuestion";
import OpenQuestion from "../../OpenQuestion/OpenQuestion";

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.input = [];
    this.state = {
      number: 0,
      isAnswerRight: {
        isRight: false,
        mistake: [],
      },
      redirect: false,
    };
    const { resetQuestions } = this.props;
    resetQuestions();
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    document.title = "TeachMe - Уроки";
    const test = this.getParam();
    getQuestions(test);
  }

  getParam() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    return id || window.location.pathname.split("/")[2];
  }

  previewQuestion = (number) => {
    this.setState((state) => ({
      number: state.number - 1,
    }));
    this.getAnotherQuestion(number);
  };

  nextQuestion = (number) => {
    this.setState((state) => ({
      number: state.number + 1,
    }));
    this.getAnotherQuestion(number);
  };

  getAnotherQuestion = (number) => {
    const { questions, getQuestion } = this.props;
    if (questions.length <= number) {
      this.setState({
        redirect: !this.state.redirect,
      });
      return;
    } else getQuestion(this.getParam(), questions[number]);
  };

  onChange = () => {
    this.input = this.input.filter(Boolean);
    const { rightAnswers } = this.props.question;
    const count = this.input.reduce(
      (total, cur) => (cur.checked ? ++total : total),
      0
    );
    if ( count === rightAnswers) {
      this.input.forEach((e) => !e.checked && e.setAttribute("disabled", ""));
    } else {
      this.input.forEach((e) => e.removeAttribute("disabled", ""));
    }
  };

  close = () => {
    this.setState({ isAnswerRight: { mistake: [], isRight: false } });
  };

  checkQuestion = (test, quest, userAnswer) => {
    const { animateError } = this.props;
    return axios
      .post(`http://localhost:5000/api/test/${test}/question/${quest}`, {
        userAnswer,
      })
      .then(({ data }) => {
        this.setState({ isAnswerRight: data });
        if (!data.isRight) animateError("Непрвильный ответ");
        return data.isRight;
      });
  };

  submitOpenQuestion = (number) => {
    const { animateError, questions } = this.props;
    const answers = this.input.filter(Boolean).map((e) => e.value);
    if (!answers.filter((e) => e !== "").length) {
      return animateError("Введите ответ");
    }
    this.checkQuestion(this.getParam(), questions[number], answers).then(
      (data) => {
        if (data) this.nextQuestion(number + 1);
      }
    );
  };

  submitQuestion = (number) => {
    const { animateError, questions } = this.props;
    const answers = this.input.filter(Boolean).map((e) => ({
      id: e.value,
      isChecked: e.checked,
    }));
    if (answers.filter((e) => e.isChecked === true).length === 0) {
      return animateError("Выберите ответ");
    }
    this.checkQuestion(
      this.getParam(),
      questions[number],
      answers.filter((e) => e.isChecked).map((e) => e.id)
    ).then((data) => {
      if (data) this.nextQuestion(number + 1);
    });
  };

  componentWillUnmount() {
    this.props.resetQuestions();
  }

  render() {
    const { question, isLoad, resetQuestions, error, title, description } =
      this.props;
    const { number, redirect, isAnswerRight } = this.state;
    if (redirect) {
      return <Redirect to="/congrats" />;
    }
    return (
      <>
        {error && <pre className="error">{error}</pre>}
        {isLoad && <Loader />}
        {!!isAnswerRight.mistake && !!isAnswerRight.mistake.length && (
          <PopUp items={isAnswerRight.mistake} close={this.close} />
        )}
        <section className="test">
          <Back onClick={resetQuestions} link="/learn" />
          <div className="container">
            <h1 className="learn_system">{title}</h1>
            <p>{description}</p>
            {question && question.isText ? (
              <TitleQuestion
                previewQuestion={() => this.previewQuestion(number - 1)}
                question={question}
                number={number}
                nextQuestion={() => this.nextQuestion(number + 1)}
              />
            ) : question.isOpenQuestion ? (
              <OpenQuestion
                inputs={this.input}
                submit={() => this.submitOpenQuestion(number)}
                question={question}
                number={number}
                previewQuestion={() => this.previewQuestion(number - 1)}
              />
            ) : (
              <Answers
                question={question}
                number={number}
                inputs={this.input}
                submit={() => this.submitQuestion(number)}
                onChange={this.onChange}
                previewQuestion={() => this.previewQuestion(number - 1)}
              />
            )}
          </div>
        </section>
      </>
    );
  }
}

export default connect(
  ({ question, tests }) => ({
    question: question.question,
    questions: question.questions,
    title: question.title,
    description: question.description,
    isLoad: tests.isLoad,
    error: tests.errorMessage,
  }),
  {
    getQuestion,
    getQuestions,
    animateError,
    resetQuestions,
  }
)(Questions);
