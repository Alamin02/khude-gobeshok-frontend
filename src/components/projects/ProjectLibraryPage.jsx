import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Container, Pagination, Responsive } from "semantic-ui-react";
import { projectActions } from '../../_actions';

import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import ProjectListTiles from '../common/ProjectListTiles';
import styles from "./ProjectLibraryPage.module.css";


const ResponsiveProjectList = ({ mobile, projects }) => (
    <Container className={styles.projectListContainer}>
        <ProjectListTiles
            projects={projects}
            itemsPerRow={mobile ? 2 : 4}
        />
    </Container>
)


class ProjectsPage extends Component {
    state = {
        activePage: 1
    }

    componentDidMount() {
        this.props.getProjectList();
    }

    handlePageChange = (e, { activePage }) => {
        this.setState({ activePage });
        this.props.getProjectList(activePage);
        window.scrollTo(0, 0);
    }

    render() {
        const { projectCount, project_list } = this.props;
        let numberOfPages = Math.ceil(projectCount / 12); // Retrieved Page Size (Number of Projects per page) is 12.

        return (
            <div className={styles.pageContainer}>
                <ScrollToTopOnMount />
                <div className={styles.pageHeaderContainer} >
                    <Header as='h1' textAlign="center" className={styles.pageHeader} icon>Project Garage
                    </Header>
                </div>

                <Responsive {...Responsive.onlyMobile}>
                    <ResponsiveProjectList mobile projects={project_list} />
                </Responsive>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <ResponsiveProjectList projects={project_list} />
                </Responsive>

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
        getProjectList: (pageNumber) => dispatch(projectActions.get_project_list(pageNumber)),
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(ProjectsPage);