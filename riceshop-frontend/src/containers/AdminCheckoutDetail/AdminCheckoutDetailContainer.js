import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AdminCheckoutDetail from 'components/checkout/AdminCheckoutDetail';
import AdminCheckoutDetailWrapper from 'components/checkout/AdminCheckoutDetailWrapper';
import * as checkoutActions from 'store/modules/checkout';

class AdminCheckoutDetailContainer extends Component {
    getCheckoutById = async () => {
        const { CheckoutActions, id } = this.props;
        try {
            await CheckoutActions.getCheckoutById(id);
        } catch(e){
            console.log(e);
        }
    }

    componentDidMount() {
        this.getCheckoutById();
    }
 render() {
     const { checkout, loading } = this.props;
     if(loading) return null;
   return (
    <AdminCheckoutDetailWrapper>
        <AdminCheckoutDetail checkout={checkout}/>
    </AdminCheckoutDetailWrapper>
   );
 }
}

export default connect(
  (state) => ({
      checkout: state.checkout.get('checkout'),
      loading: state.pender.pending['checkout/GET_CHECKOUT_BY_ID']
  }),
  (dispatch) => ({
      CheckoutActions: bindActionCreators(checkoutActions, dispatch)
  })
)(AdminCheckoutDetailContainer);