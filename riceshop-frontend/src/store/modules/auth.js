import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api.member';

// action types
const INITIALIZE = 'auth/INITIALIZE';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const REGISTER = 'auth/REGISTER';
const LOGIN = 'auth/LOGIN';

// action creator
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const register = createAction(REGISTER, api.register);
export const login = createAction(LOGIN, api.login);



// initial state
const initialState = Map({
    input: Map({
        userID: '',
        userPassword: '',
        userPasswordConfirm: '',
        userEmail: '',
        userName: ''
    }),
    memberLogged: false
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
            return state.set('memberLogged', false);
        }
    })
}, initialState);