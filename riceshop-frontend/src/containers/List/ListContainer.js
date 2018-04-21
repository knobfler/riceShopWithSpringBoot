import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ItemWrapper from 'components/list/ItemWrapper';
import CategoryWrapper from 'components/list/CategoryWrapper';
import PostItem from 'components/list/PostItem';
import * as postActions from 'store/modules/post';

class ListContainer extends Component {

    getItemList = async () => {
        const { PostActions } = this.props;

        try {
            await PostActions.getPostItemList();
        } catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getItemList();
    }
 render() {
     const { postItemList } = this.props;
   return (
    <div>
        <CategoryWrapper category="판매중인 상품">
        <ItemWrapper>
            <PostItem postItemList={postItemList}/>
        </ItemWrapper>
        </CategoryWrapper>
    </div>
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
)(ListContainer);