import React, { Component } from 'react'
import { connect } from 'react-redux';

import { projectActions } from '../_actions';

import { HTMLRenderer } from '@react-page/renderer'
import { createEmptyState } from '@react-page/core'

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


class ProjectView extends Component {
    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        this.props.get_project(id);
    }

    render() {
        console.log(this.props.project);
        const contents = this.props.project.description || createEmptyState();
        return (
            <div style={{ paddingLeft: "200px", paddingRight: "200px", paddingTop: "50px" }}>

                {/* Content area */}
                <HTMLRenderer state={contents} plugins={plugins} />

            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
