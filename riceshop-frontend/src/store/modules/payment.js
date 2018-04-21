import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';

// action types
const CHANGE_INPUT = 'payment/CHANGE_INPUT';

// action creator
export const changeInput = createAction(CHANGE_INPUT);

// initial state
const initialState = Map({
    userName: '',
    userPhonePost: '',
    userPhoneCenter: '',
    userPhoneRear: '',
    userAddress: '',
    userPostCode: '',
    userDetailAddress: '',
    userEmail: ''
});

// reducer
export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    }
}, initialState);