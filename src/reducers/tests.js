import { GET_TESTS, IS_LOAD, ERROR, CLOSE_ERROR } from "../actions/tests";

const DEFAULT_STATE = {
  isLoad: false,
  errorMessage: "",
  tests: [],
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case IS_LOAD:
      return { ...state, isLoad: action.payload };

    case GET_TESTS:
      return { ...state, tests: action.payload };

    case ERROR:
      return { ...state, errorMessage: action.payload };

    case CLOSE_ERROR: 
      return { ...state, errorMessage: ''}

    default:
      return state;
  }
};
