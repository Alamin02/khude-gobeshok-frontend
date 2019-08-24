import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { editorActions, projectActions } from "../_actions";
import './ProjectDetails.css'

import { convertToRaw } from 'draft-js'

import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import createImagePlugin from 'draft-js-image-plugin'
import 'draft-js-image-plugin/lib/plugin.css';
import createVideoPlugin from 'draft-js-video-plugin';
import 'draft-js-video-plugin/lib/plugin.css';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from 'draft-js-buttons';

import AddImage from "./editor-components/AddImage";
import AddVideo from "./editor-components/AddVideo";
import { Popup, Button, Segment, Grid, Form, Divider } from "semantic-ui-react";
import ProjectDetailsEditor from './ProjectDetailsEditor';

const toolbarPlugin = createToolbarPlugin();
const imagePlugin = createImagePlugin({
    theme: {
        image: "editor-image-content"
    }
});
const videoPlugin = createVideoPlugin({});

const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin, imagePlugin, videoPlugin];
const text = 'Start Typing your project details from here...';

const contents = (<Segment placeholder>
    <Form>
        <Form.Input icon='linkify' iconPosition='left' label='URL' placeholder='URL' />
        <Button content='Add' primary />
    </Form>
</Segment>)

class ProjectDetails extends Component {

    state = {
        editorState: createEditorStateWithText(text),
    };

    onChange = (editorState) => {
        this.setState({
            editorState
        });
        this.props.descriptionChange(convertToRaw(editorState.getCurrentContent()));
    };

    focus = () => {
        this.editor.focus();
    };

    handleSubmit = () => {
        this.props.createProject(this.props.project);
        let path = `/projects`;
        this.props.history.push(path);
    }

    render() {
        return (
            <div>
                <div onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }}
                    />
                    <Toolbar>
                        {
                            // may be use React.Fragment instead of div to improve perfomance after React 16
                            (externalProps) => (
                                <div>
                                    <HeadlineOneButton {...externalProps} />
                                    <HeadlineTwoButton {...externalProps} />
                                    <Separator {...externalProps} />
                                    <BoldButton {...externalProps} />
                                    <ItalicButton {...externalProps} />
                                    <UnderlineButton {...externalProps} />
                                    <CodeButton {...externalProps} />
                                    <Separator {...externalProps} />
                                    <UnorderedListButton {...externalProps} />
                                    <OrderedListButton {...externalProps} />
                                    <BlockquoteButton {...externalProps} />
                                    <Separator {...externalProps} />
                                </div>
                            )
                        }
                    </Toolbar>
                </div>
                <AddImage editorState={this.state.editorState} onChange={this.onChange} modifier={imagePlugin.addImage} />
                <AddVideo editorState={this.state.editorState} onChange={this.onChange} modifier={videoPlugin.addVideo} />
                <div style={{
                    textAlign: "center",
                    margin: "20px",
                }}>
                    <Button content='Submit' secondary onClick={this.handleSubmit} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let { editor } = state;
    return {
        project: editor,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        descriptionChange: (editable) => dispatch(editorActions.editor_description_change(editable)),
        createProject: (project) => dispatch(projectActions.create_project(project)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectDetails));
