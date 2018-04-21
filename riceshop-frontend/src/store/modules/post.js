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

// action creator
export const postItem = createAction(POST_ITEM, api.postItem);
export const getPostItemById = createAction(GET_POST_ITEM_BY_ID, api.getPostItemById);
export const selectorChanged = createAction(SELECTOR_CHANGED);
export const numberChanged = createAction(NUMBER_CHANGED);
export const initialize = createAction(INITIALIZE);
export const getPostItemList = createAction(GET_POST_ITEM_LIST, api.getPostItemList);
// initial state
const initialState = Map({
    itemId: '',
    item: Map({}),
    eachPrice: 0,
    number: 0,
    totalPrice: 0,
    number: 1,
    postItemList: List()
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
            return state.set('item', fromJS(item));
        }
    }),
    [SELECTOR_CHANGED]: (state, action) => {
        // console.log(act)
        const { value } = action.payload;
        return state.set('eachPrice', parseInt(value, 10))
                    .set('totalPrice', parseInt(value, 10))
                    .set('number', 1);
    },
    [INITIALIZE]: (state, action) => {
        const { initialPrice } = action.payload;

        return state.set('eachPrice', initialPrice)
                    .set('totalPrice', initialPrice);
    },
    [NUMBER_CHANGED]: (state, action) => {
        const { value } = action.payload;
        const eachPrice = parseInt(state.get('eachPrice'), 10);
        return state.set('totalPrice', parseInt(value, 10) * eachPrice)
                    .set('number', parseInt(value, 10));
    },
    ...pender({
        type: GET_POST_ITEM_LIST,
        onSuccess: (state, action) => {
            const { data: postItemList } = action.payload;
            return state.set('postItemList', postItemList);
        }
    })
}, initialState);