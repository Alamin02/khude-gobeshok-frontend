import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { EditorState, convertFromRaw } from 'draft-js';
import { Container, Button, Header, Image, Grid, Segment } from 'semantic-ui-react'
import moment from "moment";
import { projectActions } from "../../_actions";

import styles from "./Review.module.css";


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
    };

    render() {
        const { description, title, startDate, endDate, coverImage } = this.props;

        const editorState = (
            description &&
            EditorState.createWithContent(
                convertFromRaw(description)
            )
        ) || EditorState.createEmpty();

        let subheader = "From " + moment(startDate).format('LL') + " to " + moment(endDate).format('LL');

        return (
            <div >
                <Container text as={Segment} padded >

                    <img src={coverImage.image} className={styles.coverImage} />

                    <Header as="h1" dividing>
                        <Header.Content className={styles.projectHeader}>
                            {title}
                        </Header.Content>
                        <Header.Subheader className={styles.projectSubheader}>
                            {subheader}
                        </Header.Subheader>
                    </Header>

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
    let { description, title, startDate, endDate, coverImage } = state.editor;

    return {
        description,
        title,
        startDate,
        endDate,
        coverImage,
        project: state.editor,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createProject: (project) => dispatch(projectActions.create_project(project)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectViewer));
