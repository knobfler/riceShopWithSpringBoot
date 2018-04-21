import React from 'react';
import PostContainer from 'containers/Post/PostContainer';
import PageTemplate from 'components/common/PageTemplate';
import { bindActionCreators } from 'redux';
import * as postActions from 'store/modules/post';
const PostPage = ({match}) => {
    const { id } = match.params;
    return (
        <PageTemplate>
            <PostContainer id={id}/>
        </PageTemplate>
    );
};

PostPage.preload = (dispatch, params) => {
    const { id } = params;
    const PostActions = bindActionCreators(postActions, dispatch);
    return PostActions.getPostItemById(id);
  }

export default PostPage;