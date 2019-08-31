import React, { Component } from 'react'
import { connect } from 'react-redux'

import { EditorState, convertFromRaw } from 'draft-js';

import { projectActions } from '../_actions';

import { Container, Grid, Image, Header } from 'semantic-ui-react'

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
    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        this.props.get_project(id);
    }

    render() {
        const { description } = this.props.project;
        const editorState = (description && EditorState.createWithContent(convertFromRaw(description))) || EditorState.createEmpty();
        console.log(this.props.project);
        return (
            <div style={{ minHeight: '100vh' }}>
                <Container text style={{ marginTop: '5em' }}>
                    <Grid style={{ marginBottom: "20px" }}>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Image src={this.props.project.thumbnail} />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Header as="h1" content={this.props.project.title} />
                                <p>Started: {this.props.project.start_date} || Finished: {this.props.project.start_date}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Editor
                        editorState={editorState}
                        plugins={plugins}
                        readOnly
                    />
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { project_loaded, project } = state.project;
    return {
        project,
        project_loaded,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_project: (project_id) => dispatch(projectActions.get_project(project_id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectViewer);