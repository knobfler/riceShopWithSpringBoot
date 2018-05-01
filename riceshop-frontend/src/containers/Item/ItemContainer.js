import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ItemWrapper from 'components/item/ItemWrapper';
import Item from 'components/item/Item';
import * as postActions from 'store/modules/post';

class ItemContainer extends Component {

  getItemList = async () => {
    const { PostActions } = this.props;

    try {
      await PostActions.getPostItemList();
    } catch(e){
      console.log(e);
    }
  }
  componentDidMount() {
    this.getItemList();
  }
 render() {
   const { postItemList } = this.props;
   return (
    <ItemWrapper>
        <Item postItemList={postItemList}/>
    </ItemWrapper>
   );
 }
}

export default connect(
  (state) => ({
    postItemList: state.post.get('postItemList')
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(ItemContainer);