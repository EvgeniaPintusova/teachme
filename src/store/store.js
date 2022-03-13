import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tests from "../reducers/tests";
import auth from '../reducers/auth'
import question from "../reducers/questions";

const jwtToken = localStorage.getItem('JWT_TOKEN');

const store = createStore(combineReducers(
    {
        tests,
        question,
        auth
    },
    {
        auth: {
            token: jwtToken,
            isAuthenticated: jwtToken ? true : false,
        }
    }),
    applyMiddleware(thunk)
);
export default store;
