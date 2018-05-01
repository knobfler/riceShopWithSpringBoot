import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import * as api from 'lib/api.checkout';
import { pender } from 'redux-pender';

// action types
const GET_CHECKOUT_LIST = 'checkout/GET_CHECKOUT_LIST';
const GET_CHECKOUT_BY_ID = 'checkout/GET_CHECKOUT_BY_ID';
const GET_UNCHECKED_LIST = 'checkout/GET_UNCHECKED_LIST';
const HANDLE_SELECT = 'checkout/HANDLE_SELECT';
const SEARCH = 'checkout/SEARCH';
const CHANGE_INPUT = 'checkout/CHANGE_INPUT';

// action creator
export const getCheckoutList = createAction(GET_CHECKOUT_LIST, api.getCheckoutList);
export const getCheckoutById = createAction(GET_CHECKOUT_BY_ID, api.getCheckoutById);
export const getUncheckedList = createAction(GET_UNCHECKED_LIST, api.getUncheckedList);
export const handleSelect = createAction(HANDLE_SELECT);
export const search = createAction(SEARCH, api.search);
export const changeInput = createAction(CHANGE_INPUT);

// initial state
const initialState = Map({
    list: List(),
    checkout: Map({}),
    uncheckedList: List(),
    selectedValue: 'username',
    search: '',
    searchedList: List()
});

// reducer
export default handleActions({
    ...pender({
        type: GET_CHECKOUT_LIST,
        onSuccess: (state, action) => {
            const { data: list } = action.payload;
            return state.set('list', fromJS(list));
        }
    }),
    ...pender({
        type: GET_CHECKOUT_BY_ID,
        onSuccess: (state, action) => {
            const { data: checkout } = action.payload;
            return state.set('checkout', checkout);
        }
    }),
    ...pender({
        type: GET_UNCHECKED_LIST,
        onSuccess: (state, action) => {
            const { data: list } = action.payload;
            return state.set('uncheckedList', fromJS(list));
        }
    }),
    [HANDLE_SELECT]: (state, action) => {
        const { value } = action.payload;
        return state.set('selectedValue', value);
    },
    ...pender({
        type: SEARCH,
        onSuccess: (state, action) => {
            const { data: list } = action.payload;
            return state.set('searchedList', fromJS(list))
                        .set('list', fromJS(list));
        }
    }),
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    }
}, initialState);