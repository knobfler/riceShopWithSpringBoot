import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import * as api from 'lib/api.post';
import { pender } from 'redux-pender';
// action types
const POST_ITEM = 'post/POST_ITEM';
const INITIALIZE = 'post/INITIALIZE';
const GET_POST_ITEM_BY_ID = 'post/GET_POST_ITEM_BY_ID';
const SELECTOR_CHANGED = 'post/SELECTOR_CHANGED';
const NUMBER_CHANGED = 'post/NUMBER_CHANGED';
const GET_POST_ITEM_LIST = 'post/GET_POST_ITEM_LIST';
const DELETE_ITEM_BY_ID = 'post/DELETE_ITEM_BY_ID';
const UPDATE_ITEM_BY_ID = 'post/UPDATE_ITEM_BY_ID';

// action creator
export const postItem = createAction(POST_ITEM, api.postItem);
export const getPostItemById = createAction(GET_POST_ITEM_BY_ID, api.getPostItemById);
export const selectorChanged = createAction(SELECTOR_CHANGED);
export const numberChanged = createAction(NUMBER_CHANGED);
export const initialize = createAction(INITIALIZE);
export const getPostItemList = createAction(GET_POST_ITEM_LIST, api.getPostItemList);
export const deleteItemById = createAction(DELETE_ITEM_BY_ID, api.deleteItemById);
export const updateItemById = createAction(UPDATE_ITEM_BY_ID, api.updateItemById);
// initial state
const initialState = Map({
    itemId: '',
    item: Map({}),
    eachPrice: 0,
    totalPrice: 0,
    number: 1,
    postItemList: List(),
    selectedOption: ''
});

// reducer
export default handleActions({
    ...pender({
        type: POST_ITEM,
        onSuccess: (state, action) => {
            const { data: item } = action.payload;

            return state.set('itemId', item.id);
        }
    }),
    ...pender({
        type: GET_POST_ITEM_BY_ID,
        onSuccess: (state, action) => {
            const { data: item } = action.payload;
            return state.set('item', fromJS(item))
                        .set('selectedOption', item.options.split(",")[0]);
        }
    }),
    [SELECTOR_CHANGED]: (state, action) => {
        // console.log(act)
        const { value, option } = action.payload;
        return state.set('eachPrice', parseInt(value, 10))
                    .set('totalPrice', parseInt(value, 10))
                    .set('number', 1)
                    .set('selectedOption', option);
    },
    [INITIALIZE]: (state, action) => {
        const { initialPrice } = action.payload;

        return state.set('eachPrice', initialPrice)
                    .set('totalPrice', initialPrice)
                    .set('number', 1);
    },
    [NUMBER_CHANGED]: (state, action) => {
        const { value } = action.payload;
        const eachPrice = parseInt(state.get('eachPrice'), 10);
        if(value === "") {
            return state.set('totalPrice', 1 * eachPrice)
                        .set('number', "");
        }
        if(value <= 0) {
            return state.set('totalPrice', 1 * eachPrice)
                        .set('number', 1);
        }
        return state.set('totalPrice', parseInt(value, 10) * eachPrice)
                    .set('number', parseInt(value, 10));
    },
    ...pender({
        type: GET_POST_ITEM_LIST,
        onSuccess: (state, action) => {
            const { data: postItemList } = action.payload;
            return state.set('postItemList', postItemList);
        }
    }),
    ...pender({
        type: UPDATE_ITEM_BY_ID,
        onSuccess: (state, action) => {
            const { data: item } = action.payload;
            return state.set('itemId', item.id);


        }
    })
}, initialState);