import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api.member';

// action types
const INITIALIZE = 'auth/INITIALIZE';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const REGISTER = 'auth/REGISTER';
const LOGIN = 'auth/LOGIN';
const RESET_ERROR_MESSAGE = 'auth/RESET_ERROR_MESSAGE';

// action creator
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const register = createAction(REGISTER, api.register);
export const login = createAction(LOGIN, api.login);
export const resetErrorMessage = createAction(RESET_ERROR_MESSAGE);



// initial state
const initialState = Map({
    input: Map({
        userID: '',
        userPassword: '',
        userPasswordConfirm: '',
        userEmail: '',
        userName: ''
    }),
    memberLogged: false,
    errorCode: '',
    errorMessage: '',
    registerSuccess: false
});

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['input', name], value);
    },
    ...pender({
        type: LOGIN,
        onSuccess: (state, action) => {
            const { data: isSuccess } = action.payload;
            return state.set('memberLogged', isSuccess);
        },
        onError: (state, action) => {
            return state.set('memberLogged', false)
                        .set('errorMessage', '아이디 혹은 비밀번호가 일치하지 않습니다.');
        }
    }),
    [RESET_ERROR_MESSAGE]: (state, action) => {
        return state.set('errorMessage', '');
    },
    ...pender({
        type: REGISTER, 
        onSuccess: (state, action) => {
            return state.set('registerSuccess', true);
        },
        onError: (state, action) => {
            const { errorCode, errorLog } = action.payload.response.data;
            return state.set('errorMessage', errorLog)
                        .set('errorCode', errorCode);
        }
    })
}, initialState);