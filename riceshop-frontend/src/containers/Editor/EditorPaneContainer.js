import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as editorActions from 'store/modules/editor';
import * as postActions from 'store/modules/post';
import EditorPane from 'components/editor/EditorPane';
import { withRouter } from 'react-router-dom';

class EditorPaneContainer extends Component {
    handleChangeInput = ({name, value}) => {
        const {EditorActions} = this.props;
        EditorActions.changeInput({name, value});
    }

    handleImageUpload = async(e) => {
        const willUploadFile = e.target.files[0];
        const { EditorActions } = this.props;
        try {
            const formData = new FormData();
            formData.append('file', willUploadFile);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            await EditorActions.editorImageUpload(formData, config);
        } catch (e) {
            console.log(e);
        }
    }


    handlePostItem = async () => {
        const { PostActions, title, markdown, option, price, history } = this.props;
        try {
            await PostActions.postItem({title, markdown,option, price});
            history.push(`/post/${this.props.itemId}`);

        } catch(e) {
          console.log(e);
        }
      }
  

    render() {
        const {title, markdown, option, price} = this.props;
        const {handleChangeInput, handleImageUpload, handlePostItem} = this;
        return (<EditorPane
            title={title}
            markdown={markdown}
            option={option}
            price={price}
            onPostItem={handlePostItem}
            onChangeInput={handleChangeInput}
            onImageUpload={handleImageUpload}/>);
    }
}

export default connect((state) => ({
    title: state
        .editor
        .get('title'),
    markdown: state
        .editor
        .get('markdown'),
    option: state.editor.get('option'),
    price: state.editor.get('price'),
    itemId: state.post.get('itemId')
}), (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
}))(withRouter(EditorPaneContainer));