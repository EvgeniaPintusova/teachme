import {
  RESET_QUESTIONS,
  GET_QUESTION,
  GET_QUESTIONS,
} from "../actions/questions";

const DEFAULT_STATE = {
  questions: [],
  title: "",
  description: "",
  question: "",
  number: 0,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_QUESTION:
      return { ...state, question: action.payload };

    case GET_QUESTIONS:
      return { ...state, questions: action.payload.questions, description: action.payload.description, title: action.payload.title };

    case RESET_QUESTIONS:
      return { ...state, questions: [], question: "", number: 0 };

    default:
      return state;
  }
};