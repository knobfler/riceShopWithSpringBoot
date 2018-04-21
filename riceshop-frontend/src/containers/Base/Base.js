import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as baseActions from 'store/modules/base';

class Base extends Component {

    initialize = () => {
        const { BaseActions } = this.props;

        if(localStorage.adminLogged === "true") {
            BaseActions.adminTempLogin();
        }
        if(localStorage.memberLogged === "true") {
            BaseActions.memberTempLogin();
        }
        BaseActions.adminCheck();
        BaseActions.memberCheck();
    }

    componentDidMount() {
        this.initialize();
    }
 render() {
     
   return (
    <div></div>
   );
 }
}

export default connect(
  (state) => ({

  }),
  (dispatch) => ({
      BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Base);