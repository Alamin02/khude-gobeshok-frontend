import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { EditorState, convertFromRaw } from 'draft-js';

import { Container, Button, Header, Image, Grid } from 'semantic-ui-react'

import { projectActions } from "../../_actions";

import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin'
import 'draft-js-image-plugin/lib/plugin.css';
import createVideoPlugin from 'draft-js-video-plugin';
import 'draft-js-video-plugin/lib/plugin.css';
import createResizePlugin from 'draft-js-resizeable-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import 'draft-js-alignment-plugin/lib/plugin.css';

const resizePlugin = createResizePlugin();
const alignmentPlugin = createAlignmentPlugin();
const decorator = composeDecorators(
    resizePlugin.decorator,
    alignmentPlugin.decorator,
);
const imagePlugin = createImagePlugin({
    decorator,
    theme: {
        image: "editor-image-content"
    }
});
const videoPlugin = createVideoPlugin({});

const plugins = [imagePlugin, videoPlugin, resizePlugin, alignmentPlugin];

class ProjectViewer extends Component {
    onChange = () => { };

    handleSubmit = () => {
        this.props.createProject(this.props.project);
        let path = `/projects`;
        this.props.history.push(path);
    };

    render() {
        const description = this.props.description;
        const editorState = (description && EditorState.createWithContent(convertFromRaw(description))) || EditorState.createEmpty();
        return (
            <div >
                <Container text >
                    <Grid style={{ marginBottom: "20px" }}>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Image src={this.props.project.thumbnail} />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Header as="h1" content={this.props.project.title} />
                                <p>Started: {this.props.project.startDate.toLocaleDateString("en-US")} || Finished: {this.props.project.endDate.toLocaleDateString("en-US")}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
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
        project: editor,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createProject: (project) => dispatch(projectActions.create_project(project)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectViewer));
