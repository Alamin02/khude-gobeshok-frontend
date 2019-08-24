import React, { Component } from 'react'
import { connect } from 'react-redux';

import { editorActions, projectActions } from "../_actions";

import { Segment, Header, Button } from 'semantic-ui-react';

// The editor core
import Editor, { Editable, createEmptyState } from '@react-page/core'
import '@react-page/core/lib/index.css' // we also want to load the stylesheets

// Require our ui components (optional). You can implement and use your own ui too!
import { Trash, DisplayModeToggle, Toolbar } from '@react-page/ui'
import '@react-page/ui/lib/index.css'

// Load some exemplary plugins:
import slate from '@react-page/plugins-slate' // The rich text area plugin
import '@react-page/plugins-slate/lib/index.css' // Stylesheets for the rich text area plugin
import parallax from '@react-page/plugins-parallax-background' // A plugin for parallax background images
import '@react-page/plugins-parallax-background/lib/index.css' // Stylesheets for parallax background images
import video from '@react-page/plugins-video'
import '@react-page/plugins-video/lib/index.css'
import image from '@react-page/plugins-image'
import '@react-page/plugins-image/lib/index.css'
import spacer from '@react-page/plugins-spacer'
import '@react-page/plugins-spacer/lib/index.css'
import background from '@react-page/plugins-background'
import '@react-page/plugins-background/lib/index.css'
//require('react-tap-event-plugin')() // react-tap-event-plugin is required by material-ui which is used by ory-editor-ui so we need to call it here

// Define which plugins we want to use. We only have slate and parallax available, so load those.
const plugins = {
    content: [slate(), image, video, spacer], // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
    layout: [parallax({ defaultPlugin: slate() })] // Define plugins for layout cells
}

// Creates an empty editable
const content = createEmptyState()

// Instantiate the editor
const editor = new Editor({
    plugins,
    // pass the content state - you can add multiple editables here
    editables: [content],
    defaultPlugin: slate(),
})

class ProjectDetailsEditor extends Component {
    render() {
        return (
            <div style={{ paddingLeft: "200px", paddingRight: "200px", paddingTop: "50px", paddingBottom: "200px" }}>
                <Segment clearing>
                    <Header as='h1' floated="left">
                        Project Description
                    </Header>
                    <Button.Group floated="right">
                        <Button>Clear</Button>
                        <Button.Or />
                        <Button positive onClick={() => { this.props.createProject(this.props.project) }}>Save</Button>
                    </Button.Group>
                </Segment>

                {/* Content area */}
                <Editable editor={editor} id={content.id} onChange={(editable) => (this.props.descriptionChange(editable))} />

                {/*  Default user interface  */}
                <Trash editor={editor} />
                <DisplayModeToggle editor={editor} />
                <Toolbar editor={editor} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsEditor);
