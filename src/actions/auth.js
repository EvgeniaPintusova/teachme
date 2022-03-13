import { client } from '../helper/customAxios';
import { isLoad } from "./tests";

export const SET_USER = 'SET_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const GOOGLE_AUTH = 'GOOGLE_AUTH';
export const FACEBOOK_AUTH = 'GOOGLE_AUTH';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const GET_USER = 'GET_USERNAME';
export const CANSEL_ERROR = 'CANSEL_ERROR';

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const isError = (message) => ({
    type: AUTH_ERROR,
    payload: message
});

export const canselError = () => ({
    type: CANSEL_ERROR
})

export const setGoogleUser = data => async dispatch => {
    try {
        const request = client();
        dispatch(isLoad(true));
        const token = await request.post('http://localhost:5000/api/user/oauth/google', { access_token: data });
        dispatch(isLoad(false));
        dispatch({
            type: GOOGLE_AUTH,
            payload: token.data.token
        });
        dispatch({
            type: GET_USER,
            payload: token.data.name
        });
        localStorage.setItem('JWT_TOKEN', token.data.token);
    } catch (err) {
        dispatch(isError('Google auth error'));
        dispatch(isLoad(false));
        setTimeout(() => dispatch(canselError()), 5000);
    }
}

export const setFacebookUser = data => async dispatch => {
    try {
        const request = client();
        dispatch(isLoad(true));
        const token = await request.post('http://localhost:5000/api/user/oauth/facebook', { access_token: data });
        dispatch(isLoad(false));
        dispatch({
            type: FACEBOOK_AUTH,
            payload: token.data.token
        });
        dispatch({
            type: GET_USER,
            payload: token.data.name
        });
        localStorage.setItem('JWT_TOKEN', token.data.token);
    } catch (err) {
        dispatch(isError('Facebook auth error'));
        dispatch(isLoad(false));
        setTimeout(() => dispatch(canselError()), 5000);
    }
}

export const signUp = data => async dispatch => {
    try {
        const request = client();
        dispatch(isLoad(true));
        let user = {};
        user = await request.post('http://localhost:5000/api/user/signup', data.signUp)
        dispatch(isLoad(false));
        dispatch(setUser(user.data.token));
        dispatch({
            type: GET_USER,
            payload: user.data.name
        });
        localStorage.setItem('JWT_TOKEN', user.data.token);
    } catch (err) {
        dispatch(isError('Данный email уже зарегистрирован'));
        dispatch(isLoad(false));
        setTimeout(() => dispatch(canselError()), 5000);
    }
}

export const signOut = () => dispatch => {
    localStorage.removeItem('JWT_TOKEN');
    dispatch({
        type: SIGN_OUT
    });
}

export const signIn = data => async dispatch => {
    try {
        const request = client();
        dispatch(isLoad(true));
        const user = await request.post('http://localhost:5000/api/user/signin', data);
        dispatch(isLoad(false));
        dispatch(setUser(user.data.token));
        dispatch({
            type: GET_USER,
            payload: user.data.name
        });
        localStorage.setItem('JWT_TOKEN', user.data.token);
    } catch (err) {
        dispatch(isError('Ошибка авторизации'));
        dispatch(isLoad(false));
        setTimeout(() => dispatch(canselError()), 5000);
    }
}

export const getUser = () => async dispatch => {
    try {
        const request = client();
        dispatch(isLoad(true));
        const user = await request.get('http://localhost:5000/api/user/me');
        dispatch(isLoad(false));
        dispatch({
            type: GET_USER,
            payload: user.data.user.username
        });
    } catch (e) {
        dispatch(isLoad(false));
        dispatch({ type: SIGN_OUT })
    }
}
