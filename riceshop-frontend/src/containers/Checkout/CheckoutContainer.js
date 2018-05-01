import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckoutList from 'components/checkout/CheckoutList';
import CheckoutWrapper from 'components/checkout/CheckoutWrapper';
import * as checkoutActions from 'store/modules/checkout';

class CheckoutContainer extends Component {
    getCheckoutList = async () => {
        const { CheckoutActions } = this.props;
        try {
            await CheckoutActions.getCheckoutList({filter: "all"});
        } catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getCheckoutList();
    }

    // getUncheckedList = async() => {
    //     const { CheckoutActions } = this.props;
    //     try {
    //         await CheckoutActions.getUncheckedList();

    //     } catch(e){
    //         console.log(e);
    //     }
    // }

    handleSelect = async ({value}) => {
        const { CheckoutActions } = this.props;
        try {
            await CheckoutActions.getCheckoutList({filter: value});
        } catch(e){
            console.log(e);
        }
    }

    handleSearchSelect = ({value}) => {
        const { CheckoutActions } = this.props;
        CheckoutActions.handleSelect({value});
    }   

    search = async () => {
        const { CheckoutActions, selectedValue, search } = this.props;
        try {
            await CheckoutActions.search({filter: selectedValue, value: search});
        } catch(e){
            console.log(e);
        }
    }

    handleChangeInput = ({name, value}) => {
        const { CheckoutActions } = this.props;
        CheckoutActions.changeInput({name, value});
    }
 render() {
     const { list } = this.props;
     const { handleSelect, handleSearchSelect, handleChangeInput, search } = this;
     const { adminLogged } = this.props;
     if(!adminLogged) {
         return null;
     }
   return (
    <CheckoutWrapper 
        onSelect={handleSelect} 
        onSearchSelect={handleSearchSelect} 
        onChangeInput={handleChangeInput}
        onSearch={search}>
        <CheckoutList checkoutList={list}/>
    </CheckoutWrapper>
   );
 }
}

export default connect(
  (state) => ({
      list: state.checkout.get('list'),
      selectedValue: state.checkout.get('selectedValue'),
      search: state.checkout.get('search'),
      adminLogged: state.base.get('adminLogged')
  }),
  (dispatch) => ({
      CheckoutActions: bindActionCreators(checkoutActions, dispatch)
  })
)(CheckoutContainer);