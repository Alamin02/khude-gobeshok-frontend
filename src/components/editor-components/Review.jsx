import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { EditorState, convertFromRaw } from 'draft-js';

import { Container, Button } from 'semantic-ui-react'

import { projectActions } from "../../_actions";

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

    handleSubmit = () => {
        this.props.createProject(this.props.project);
        let path = `/projects`;
        this.props.history.push(path);
    }

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
                <div style={{
                    textAlign: "center",
                    margin: "20px",
                }}>
                    <Button content='Submit' secondary onClick={this.handleSubmit} />

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { description } = state.editor;
    let { editor } = state;
    return {
        description: description,
        project: editor
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createProject: (project) => dispatch(projectActions.create_project(project)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectViewer));
