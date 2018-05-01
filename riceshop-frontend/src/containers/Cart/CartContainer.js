import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cartActions from 'store/modules/cart';
import CartWrapper from 'components/cart/CartWrapper';
import CartContent from 'components/cart/CartContent';
import CartTable from 'components/cart/CartTable';

class CartContainer extends Component {

  getCartList = async () => {
    const { CartActions } = this.props;
    const config = {
      headers: { Pragma: 'no-cache'}
  };
    try {
       await CartActions.getCartList(config);
    } catch(e){
      console.log(e);
    }
    
  }

  componentDidMount() {
    this.getCartList();
    
    
  }



  removeCartById = async (e) => {
    const { CartActions } = this.props;
    const removeId = e.target.getAttribute("removeid");
    
    try {
      await CartActions.removeCartById(removeId);
    } catch(e) {
      console.log(e);
    }
  }
 render() {
   const { cartList, loading, totalPrice } = this.props;
   const { removeCartById } = this;
   if(loading) return null;
   return (
    //  <div>
    //    <input type="text" value={JSON.stringify(cartList)} style={{width: "100%", height: "3rem"}}/>
    //   </div>
    <CartWrapper>
        <CartContent>
            <CartTable cartList={cartList} totalPrice={totalPrice} onRemoveById={removeCartById}/>
        </CartContent>
    </CartWrapper>
   );
 }
}

export default connect(
  (state) => ({
    cartList: state.cart.get('cartList'),
    loading: state.pender.pending['cart/GET_CART_LIST'],
    totalPrice: state.cart.get('totalPrice')
  }),
  (dispatch) => ({
    CartActions: bindActionCreators(cartActions, dispatch)
  })
)(CartContainer);