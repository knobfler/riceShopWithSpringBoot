import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as baseActions from 'store/modules/base';
import Header from 'components/common/Header';

class HeaderContainer extends Component {
 render() {
     const { adminLogged, memberLogged } = this.props;
   return (
    <Header adminLogged={adminLogged} memberLogged={memberLogged}/>
   );
 }
}

export default connect(
  (state) => ({
      adminLogged: state.base.get('adminLogged'),
      memberLogged: state.base.get('memberLogged')
  }),
  (dispatch) => ({
  })
)(HeaderContainer);