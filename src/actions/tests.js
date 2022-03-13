import axios from "axios";

export const GET_TESTS = "GET_TESTS";
export const IS_LOAD = "IS_LOAD";
export const ERROR = "ERROR";
export const CLOSE_ERROR = "CLOSE_ERROR";

export const isError = (message) => ({
    type: ERROR,
    payload: message
});

export const animateError = message => dispatch => {
    dispatch(isError(message));
    setTimeout(() => dispatch(canselError()), 5000);
}

export const canselError = () => ({
    type: CLOSE_ERROR
})

export const isLoad = (load) => ({
    type: IS_LOAD,
    payload: load
});

export const getTests = () => async dispatch => {
    try {
        dispatch(isLoad(true));
        const { data } = await axios.get('http://localhost:5000/api/tests');
        dispatch(isLoad(false));
        dispatch({
            type: GET_TESTS,
            payload: data
        });
    } catch (error) {
        dispatch(animateError('Тесты не найдены'));
        dispatch(isLoad(false));
    }
}

export const getTest = (id) => async dispatch => {
    try {
        dispatch(isLoad(true));
        await axios.get(`/api/test/:${id}`);
        dispatch(isLoad(false));
    } catch (error) {
        dispatch(animateError('Тест не найден'));
        dispatch(isLoad(false));
    }
}

export const putTest = (id) => async dispatch => {
    try {
        dispatch(isLoad(true));
        await axios.put(`/api/test/:${id}`);
        dispatch(isLoad(false));
    } catch (error) {
        dispatch(animateError('Ошибка записи'));
        dispatch(isLoad(false));
    }
}

export const deleteTest = (id) => async dispatch => {
    try {
        dispatch(isLoad(true));
        await axios.delete(`/api/test/:${id}`);
        dispatch(isLoad(false));
    } catch (error) {
        dispatch(animateError('Тест не удалён'));
        dispatch(isLoad(false));
    }
}

export const postTest = (id) => async dispatch => {
    try {
        dispatch(isLoad(true));
        await axios.post(`/api/tests`);
        dispatch(isLoad(false));
    } catch (error) {
        dispatch(animateError('Тест не найден'));
        dispatch(isLoad(false));
    }
}
