import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import * as api from 'lib/api.cart';
import { pender } from 'redux-pender';

// action types
const ADD_CART = 'cart/ADD_CART';
const INITIALIZE = 'cart/INITIALIZE';
const GET_CART_LIST = 'cart/GET_CART_LIST';
const REMOVE_CART_BY_ID = 'cart/REMOVE_CART_BY_ID';
// action creator
export const addCart = createAction(ADD_CART, api.addCart);
export const initialize = createAction(INITIALIZE);
export const getCartList = createAction(GET_CART_LIST, api.getCartList);
export const removeCartById = createAction(REMOVE_CART_BY_ID, api.removeCartById);

// initial state
const initialState = Map({
    cartError: Map({
        errorCode: '',
        errorLog: ''
    }),
    cartLog: '',
    cartList: List(),
    totalPrice: 0
});

// reducer
export default handleActions({
    ...pender({
        type: ADD_CART,
        onSuccess: (state, action) => {
            const { cartLog } = action.payload.data;
            return state.set('cartLog', cartLog);
        },
        onError: (state, action) => {
            const { errorCode, errorLog } = action.payload.data;
            return state.setIn(['cartError', 'errorCode'], errorCode)
                        .setIn(['cartError', 'errorLog'], errorLog);
        }
    }),
    [INITIALIZE]: (state, action) => initialState,
    ...pender({
        type: GET_CART_LIST,
        onSuccess: (state, action) => {
            const { data: cartList } = action.payload;
            const totalPriceList = cartList.map(
                (cart, i) => {
                    let totalPrice = 0;
                    totalPrice += parseInt(cart.totalPrice, 10);
                    return totalPrice;
                }
            );
            let totalPrice = 0;
            for(let price of totalPriceList) {
                totalPrice += parseInt(price, 10);
            } 
            return state.set('cartList', cartList)
                        .set('totalPrice', totalPrice);
        }
    }),
    ...pender({
        type: REMOVE_CART_BY_ID, 
        onSuccess: (state, action) => {
            // console.log(action.payload);
            const { data: cartList } = action.payload;
            const totalPriceList = cartList.map(
                (cart, i) => {
                    let totalPrice = 0;
                    totalPrice += parseInt(cart.totalPrice, 10);
                    return totalPrice;
                }
            );
            let totalPrice = 0;
            for(let price of totalPriceList) {
                totalPrice += parseInt(price, 10);
            } 
            return state.set('cartList', cartList)
                        .set('totalPrice', totalPrice);
        }
    })
}, initialState);