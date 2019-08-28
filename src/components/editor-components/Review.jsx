import React, { Component } from 'react'
import { connect } from 'react-redux'

import { EditorState, convertFromRaw } from 'draft-js';

import { Container } from 'semantic-ui-react'

import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin'
import 'draft-js-image-plugin/lib/plugin.css';
import createVideoPlugin from 'draft-js-video-plugin';
import 'draft-js-video-plugin/lib/plugin.css';

const imagePlugin = createImagePlugin({
    theme: {
        image: "editor-image-content"
    }
});
const videoPlugin = createVideoPlugin({});

const plugins = [imagePlugin, videoPlugin];

class ProjectViewer extends Component {
    constructor(props) {
        super(props);
    }
    onChange = () => { };

    render() {
        const description = this.props.description;
        const editorState = (description && EditorState.createWithContent(convertFromRaw(description))) || EditorState.createEmpty();
        return (
            <div >
                <Container text >
                    <Editor
                        editorState={editorState}
                        plugins={plugins}
                        onChange={this.onChange}
                        readOnly
                    />
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { description } = state.editor;
    return {
        description
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectViewer);