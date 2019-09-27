import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { EditorState, convertFromRaw } from 'draft-js';

import { projectActions } from '../../_actions';

import { Container, Grid, Image, Header, Segment } from 'semantic-ui-react'

import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin'
import 'draft-js-image-plugin/lib/plugin.css';
import createVideoPlugin from 'draft-js-video-plugin';
import 'draft-js-video-plugin/lib/plugin.css';
import createResizePlugin from 'draft-js-resizeable-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import 'draft-js-alignment-plugin/lib/plugin.css';

import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

import styles from "./ProjectViewerPage.module.css";

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

    // Dummy onChange for readOnly plugin editor.
    onChange = () => { }

    render() {
        const { description, author, teammates } = this.props.project;
        const editorState = (description
            && EditorState.createWithContent(convertFromRaw(description)))
            || EditorState.createEmpty();

        return (
            <div className={styles.projectPageContainer}>
                <ScrollToTopOnMount />
                <Container text className={styles.projectTextContainer}>
                    <Grid className={styles.projectHeadingContainer}>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Image src={this.props.project.thumbnail} rounded bordered />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Header as="h1" content={this.props.project.title} className={styles.projectHeading} />
                                <p>Started: {this.props.project.start_date} || Finished: {this.props.project.start_date}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Editor
                        editorState={editorState}
                        plugins={plugins}
                        onChange={this.onChange}
                        readOnly
                    />

                    <Segment padded>
                        <p>
                            <i>Author: <Link to={`/profile/` + author}>{author}</Link></i>
                        </p>
                        {teammates &&
                            <p><i>Teammates: {teammates}</i></p>
                        }

                    </Segment>

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