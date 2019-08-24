import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Icon, Search, Header, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { projectActions } from '../_actions';

import ProjectListTiles from './ProjectListTiles';

import "./ProjectsPage.css"

class ProjectsPage extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.get_project_list();
    }

    render() {
        return (
            <div style={{
                paddingTop: "100px",
                minHeight: "80vh",
                textAlign: "center"
            }}>
                <Container>
                    <Header as='h1'>PROJECT EXPLORER</Header>
                    <Search placeholder={"Search"} >
                        <Search.Results style={{ position: "inherit", margin: "0 auto" }} />
                    </Search>
                    <ProjectListTiles projects={this.props.project_list} />
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { project_list } = state.project;
    return {
        project_list,
    }
}
function mapDipatchToProps(dispatch) {
    return {
        get_project_list: () => dispatch(projectActions.get_project_list()),
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(ProjectsPage);