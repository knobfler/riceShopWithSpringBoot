import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import EditorContainer from 'containers/Editor/EditorContainer';

const EditorPage = (props) => {
    return (
        <PageTemplate>
            <EditorContainer/>
        </PageTemplate>
    );
};

export default EditorPage;