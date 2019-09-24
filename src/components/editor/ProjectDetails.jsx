import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { editorActions } from "../../_actions";
import './ProjectDetails.css'

import { convertToRaw, convertFromRaw, EditorState } from 'draft-js'

import Editor, { createEditorStateWithText, composeDecorators } from 'draft-js-plugins-editor';


import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import createImagePlugin from 'draft-js-image-plugin';
import 'draft-js-image-plugin/lib/plugin.css';
import createVideoPlugin from 'draft-js-video-plugin';
import 'draft-js-video-plugin/lib/plugin.css';
import createFocusPlugin from 'draft-js-focus-plugin';
import 'draft-js-focus-plugin/lib/plugin.css';
import createResizePlugin from 'draft-js-resizeable-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import 'draft-js-alignment-plugin/lib/plugin.css';
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
} from 'draft-js-buttons';

import AddImage from "./AddImage";
import AddVideo from "./AddVideo";
const toolbarPlugin = createToolbarPlugin();
const focusPlugin = createFocusPlugin();
const resizePlugin = createResizePlugin();
const alignmentPlugin = createAlignmentPlugin();

const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
    focusPlugin.decorator,
    resizePlugin.decorator,
    alignmentPlugin.decorator,
);

const imagePlugin = createImagePlugin({
    decorator,
    theme: {
        image: "editor-image-content"
    }
});
const videoPlugin = createVideoPlugin();

const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin, imagePlugin, videoPlugin, focusPlugin, resizePlugin, alignmentPlugin];
const text = 'Start Typing your project details from here...';


class ProjectDetails extends Component {
    constructor(props) {
        super(props);
        const { description } = this.props.project;
        const editorState = (description && EditorState.createWithContent(convertFromRaw(description))) || createEditorStateWithText(text);

        this.state = {
            editorState
        }
    }

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
                    <AlignmentTool />
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

            </div>
        );
    }
}

function mapStateToProps(state) {
    let { editor } = state;
    return {
        project: editor,
        description: editor.description
    }
}

function mapDispatchToProps(dispatch) {
    return {
        descriptionChange: (editable) => dispatch(editorActions.editorDescriptionChange(editable)),

    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectDetails));
