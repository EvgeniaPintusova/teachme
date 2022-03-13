import { GET_USER, SET_USER, AUTH_ERROR, GOOGLE_AUTH, FACEBOOK_AUTH, SIGN_OUT, CANSEL_ERROR } from '../actions/auth';
import { IS_LOAD } from '../actions/tests';

const DEFAULT_STATE = {
    isLoad: false,
    token: '',
    errorMessage: '',
    username: '',
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, token: action.payload, isAuthenticated: true };

        case IS_LOAD:
            return { ...state, isLoad: action.payload };

        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };

        case GOOGLE_AUTH:
            return { ...state, token: action.payload, isAuthenticated: true };

        case FACEBOOK_AUTH:
            return { ...state, token: action.payload, isAuthenticated: true };

        case SIGN_OUT:
            return { ...DEFAULT_STATE };

        case GET_USER:
            return { ...state, username: action.payload, isAuthenticated: true };

        case CANSEL_ERROR:
            return { ...state, errorMessage: '' };

        default:
            return state;
    }
}
