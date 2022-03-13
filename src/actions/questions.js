import axios from "axios";
import { isLoad, animateError } from "./tests";

export const GET_QUESTION = "GET_QUESTION";
export const GET_QUESTIONS = "GET_QUESTIONS";
export const RESET_QUESTIONS = "RESET_QUESTIONS";

export const getQuestion = ( test, quest) => async dispatch => {
  try {
    const { data: question } = await axios.get(
      `http://localhost:5000/api/test/${test}/question/${quest}`
    );
    dispatch({
      type: GET_QUESTION,
      payload: question
    });
  } catch (error) {
    dispatch(animateError("Вопросы не найдены"));
  }
};

export const getQuestions = ( q ) => async dispatch => {
  try {
    dispatch(isLoad(true));
    const { data: test } = await axios.get(
      `http://localhost:5000/api/test/${q}/question`
    );
    dispatch(getQuestion(test, test.questions[0]))
    dispatch({
      type: GET_QUESTIONS,
      payload: test
    });
    dispatch(isLoad(false));
  } catch (error) {
    dispatch(animateError("Вопросы не найдены"));
    dispatch(isLoad(false));
  }
};

export const resetQuestions = () => ({
  type: RESET_QUESTIONS
})
