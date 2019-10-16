import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { EditorState, convertFromRaw } from 'draft-js';

import { projectActions } from '../../_actions';

import { Container, Grid, Image, Header, Segment, Form, Comment } from 'semantic-ui-react'

import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin'
import 'draft-js-image-plugin/lib/plugin.css';
import createVideoPlugin from 'draft-js-video-plugin';
import 'draft-js-video-plugin/lib/plugin.css';
import createResizePlugin from 'draft-js-resizeable-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import 'draft-js-alignment-plugin/lib/plugin.css';

import moment from "moment";

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
        this.props.getProject(id);
        this.props.getComments(id);
    }

    state = {
        commentDescription: "",
    }

    // Dummy onChange for readOnly plugin editor.
    onChange = () => { }

    handleChange = (e, { value }) => {
        this.setState({
            commentDescription: value,
        });
    }

    handleCommentSubmit = () => {
        const { id } = this.props.match.params;
        let comment = {
            project: id,
            commenter: this.props.username,
            description: this.state.commentDescription,
        }
        this.setState({
            commentDescription: "",
        });
        this.props.postComment(comment);
    }

    render() {
        const {
            description,
            author,
            teammates,
            start_date,
            end_date,
            created_at,
        } = this.props.project;

        const { loggedIn, } = this.props;

        const editorState = (description
            && EditorState.createWithContent(convertFromRaw(description)))
            || EditorState.createEmpty();

        let subheader = "From " + moment(start_date).format('LL') + " to " + moment(end_date).format('LL');

        const comments = this.props.comments.map((comment, index) =>
            <Comment key={index}>
                <Comment.Avatar src={comment.avatar || `/Logo.png`} />
                <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/` + comment.commenter}>{comment.commenter}</Comment.Author>
                    <Comment.Metadata>
                        <div>{moment(comment.time).fromNow()}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.description}</Comment.Text>
                </Comment.Content>
            </Comment>
        );

        return (
            <div className={styles.projectPageContainer}>
                <ScrollToTopOnMount />
                <Container text as={Segment} padded>

                    <img src={this.props.project.cover_image_obj.image} className={styles.coverImage} />

                    <Header
                        as="h1"
                        dividing
                    >
                        <Header.Content className={styles.projectHeader}>
                            {this.props.project.title}
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

                    <Segment padded>
                        <p>
                            <i>Shared by <Link to={`/profile/` + author}>{author}</Link> on {moment(created_at).format('LL')}</i>
                        </p>
                        {teammates &&
                            <p><i>Teammates: {teammates}</i></p>
                        }

                    </Segment>

                    <Header as='h3' dividing>
                        Comments
                    </Header>
                    <Comment.Group>
                        {comments}
                    </Comment.Group>

                    {loggedIn ?
                        <Form onSubmit={this.handleCommentSubmit}>
                            <Form.TextArea placeholder='Type your comment...' value={this.state.commentDescription} onChange={this.handleChange} />
                            <Form.Button>Submit</Form.Button>
                        </Form> :
                        <p>Please <Link to="/login">login</Link> or <Link to="/signup">register</Link> to comment here!</p>
                    }

                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { project_loaded, project, comments } = state.project;
    const { username } = state.users;
    const { loggedIn } = state.authentication;
    return {
        project,
        project_loaded,
        comments,
        username,
        loggedIn,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProject: (projectId) => dispatch(projectActions.getProject(projectId)),
        getComments: (projectId) => dispatch(projectActions.getComments(projectId)),
        postComment: (comment) => dispatch(projectActions.postComment(comment)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectViewer);
