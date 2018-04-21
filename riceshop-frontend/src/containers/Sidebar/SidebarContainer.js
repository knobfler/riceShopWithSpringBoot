import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as baseActions from 'store/modules/base';
import Sidebar from 'components/common/Sidebar';
import Hamburger from 'components/common/Hamburger';

class SidebarContainer extends Component {
    handleOpen = () => {
        const {BaseActions} = this.props;
        BaseActions.showSidebar();
    }

    handleClose = () => {
        const {BaseActions} = this.props;
        BaseActions.hideSidebar();
    }

    handleToggle = () => {
        const { visible } = this.props;
        const { handleClose, handleOpen } = this;
        if(visible) return handleClose();
        handleOpen();
      }

    adminLogout = async () => {
        const { BaseActions } = this.props;
        try {
            await BaseActions.adminLogout();
            document.location.href = "/";
        } catch(e){
            console.log(e);
        }
    }

    memberLogout = async () => {
        const { BaseActions } = this.props;
        try {
            await BaseActions.memberLogout();
            document.location.href = "/";
        } catch(e){
            console.log(e);
        }
    }
    render() {
        const { handleClose, handleToggle, adminLogout, memberLogout } = this;
        const { visible, adminLogged, memberLogged } = this.props;
        return [ < Sidebar 
                    adminLogout={adminLogout}
                    adminLogged={adminLogged}
                    memberLogged={memberLogged}
                    memberLogout={memberLogout}
                    visible={visible} 
                    onClose={handleClose} 
                    key={0} />, < Hamburger active={visible} onToggle={handleToggle} key={1}/>
        ]
    }
}

export default connect((state) => ({
    visible: state
        .base
        .getIn(['sideBar', 'visible'])
}), (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
}))(SidebarContainer);