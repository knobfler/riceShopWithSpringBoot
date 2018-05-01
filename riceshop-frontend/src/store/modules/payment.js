import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import * as api from 'lib/api.payment';
import { pender } from 'redux-pender';
// action types
const CHANGE_INPUT = 'payment/CHANGE_INPUT';
const GET_ACCESS_TOKEN= 'payment/GET_ACCESS_TOKEN';
const GET_MERCHANT_UID= 'payment/GET_MERCHANT_UID';

// action creator
export const changeInput = createAction(CHANGE_INPUT);
export const getAccessToken = createAction(GET_ACCESS_TOKEN, api.getAccessToken);
export const getMerchantUid = createAction(GET_MERCHANT_UID, api.getMerchantUid);

// initial state
const initialState = Map({
    userName: '',
    userPhonePost: '',
    userPhoneCenter: '',
    userPhoneRear: '',
    userAddress: '',
    userPostCode: '',
    userDetailAddress: '',
    userEmail: '',
    accessToken: '',
    iamportError: false,
    merchantUid: '',
    iamportAmount: 0
});

// reducer
export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: GET_ACCESS_TOKEN,
        onSuccess: (state, action) => {
            console.log(action.payload);
            const { responseJSON } = action.payload.data;
            const code = JSON.parse(responseJSON).code;
            if(code !== 0) {
                return state.set('iamportError', true);
            }
            return state.set('accessToken', JSON.parse(responseJSON).response.access_token);

        }
    }),
    ...pender({
        type: GET_MERCHANT_UID,
        onSuccess: (state, action) => {
            console.log(action.payload);
            const { responseJSON } = action.payload.data;
            const code = JSON.parse(responseJSON).code;
            if(code !== 0) {
                return state.set('iamportError', true);
            }
            return state.set('merchantUid', JSON.parse(responseJSON).response.merchant_uid)   
                        .set('iamportAmount', JSON.parse(responseJSON).response.amount);
        }
    })
}, initialState);