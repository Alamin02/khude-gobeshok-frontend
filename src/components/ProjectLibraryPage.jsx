import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Search, Header, Container, Icon, Pagination } from "semantic-ui-react";
import { projectActions } from '../_actions';

import ProjectListTiles from './common/ProjectListTiles';
import styles from "./ProjectLibraryPage.module.css";

class ProjectsPage extends Component {
    state = {
        activePage: 1
    }

    componentDidMount() {
        this.props.get_project_list();
    }

    handlePageChange = (e, { activePage }) => {
        this.setState({ activePage });
        this.props.get_project_list(activePage);
    }

    render() {
        const { projectCount } = this.props;
        let numberOfPages = Math.ceil(projectCount / 12); // Retrieved Page Size (Number of Projects per page) is 12.

        return (
            <div className={styles.pageContainer}>
                <Container className={styles.pageHeaderContainer} >
                    <Header as='h1' textAlign="center" className={styles.pageHeader} icon>
                        <Header.Content>Project Library</Header.Content>
                    </Header>
                </Container>

                <Search placeholder={"Search"} size="large" className={styles.projectSearch} />

                <Container className={styles.projectListContainer}>
                    <ProjectListTiles projects={this.props.project_list} />
                </Container>

                <Container className={styles.pagination}>
                    <Pagination
                        activePage={this.state.activePage}
                        totalPages={numberOfPages}
                        onPageChange={this.handlePageChange}

                    />
                </Container>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { project_list, projectCount } = state.project;
    return {
        project_list,
        projectCount
    }
}
function mapDipatchToProps(dispatch) {
    return {
        get_project_list: (pageNumber) => dispatch(projectActions.get_project_list(pageNumber)),
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(ProjectsPage);