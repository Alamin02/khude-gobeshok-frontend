import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Search, Header, Container, Icon } from "semantic-ui-react";

import { projectActions } from '../_actions';

import ProjectListTiles from './ProjectListTiles';

import styles from "./ProjectsPage.module.css";

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
                minHeight: "80vh",
                textAlign: "center"
            }}>
                <Container className={styles.pageHeaderContainer} >
                    <Header as='h1' className={styles.pageHeader} icon>
                        <Header.Content>Project Library</Header.Content>
                    </Header>

                    <Search placeholder={"Search"} className={styles.projectSearch} />
                </Container>
                <Container>
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