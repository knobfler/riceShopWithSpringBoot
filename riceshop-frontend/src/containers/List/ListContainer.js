import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ListWrapper from 'components/list/ListWrapper';
import ListItem from 'components/list/ListItem';

import * as listActions from 'store/modules/list';
import Spinner from '../../components/common/Spinner/Spinner';

class ListContainer extends Component {

    lastId = '';

    getListItem = async () => {
        const { ListActions } = this.props;

        try {
            // await ListActions.getListItem({lastId: });
        } catch(e) {
            console.log(e);
        }
    }

    getInitialList = async () => {
        const { ListActions } = this.props;

        try {
            await ListActions.getInitialList();

        } catch(e){
            console.log(e);
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.getInitialList();
        
    }
  
    handleScroll = async (e) => {
        const { clientHeight } = document.body;
        const { innerHeight } = window;

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(clientHeight - innerHeight - scrollTop < 100) {
            const { lastId, ListActions } = this.props;
            if(lastId === '' || this.lastId === lastId) {
                return;
            }
            this.lastId = lastId;
            await ListActions.getListItem({lastId: lastId});
        }
    }
 render() {
     const { itemList, loading, loadingInitial } = this.props;

   return (
    <ListWrapper>
        <ListItem itemList={itemList}/>
        <Spinner visible={loading || loadingInitial}/>
    </ListWrapper>
   );
 }
}

export default connect(
  (state) => ({
    itemList: state.list.get('itemList'),
    lastId: state.list.get('lastId'),
    loading: state.pender.pending['list/GET_LIST_ITEM'],
    loadingInitial: state.pender.pending['list/GET_INITIAL_LIST']
  }),
  (dispatch) => ({
      ListActions: bindActionCreators(listActions, dispatch)
  })
)(ListContainer);