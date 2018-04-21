import React, { Component } from 'react';

import EditorTemplate from 'components/editor/EditorTemplate';
import EditorHeader from 'components/editor/EditorHeader';
import * as editorActions from 'store/modules/editor';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditorPaneContainer from 'containers/Editor/EditorPaneContainer';
import PreviewPaneContainer from 'containers/Editor/PreviewPaneContainer';
class EditorContainer extends Component {
    
 render() {
   return (
    <EditorTemplate
    header={<EditorHeader/>}
    editor={<EditorPaneContainer />}
    preview={<PreviewPaneContainer/>}/>
   );
 }
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
      EditorActions: bindActionCreators(editorActions, dispatch)
  })
)(EditorContainer);