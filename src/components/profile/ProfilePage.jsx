import React, { Component } from 'react'
import { Container, Grid, Tab, Pagination, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import memoize from "memoize-one";
import { profileActions } from "../../_actions";

import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import ProjectListTiles from "../common/ProjectListTiles";
import ProfileTab from "./ProfileTab";
import ProfileRegularInfo from "./ProfileRegularInfo";
import styles from "./ProfilePage.module.css";

class ProfilePage extends Component {
    state = {
        activePage: 1
    }

    loadProfile = memoize(
        (profilename) => {
            this.props.getProjects(profilename);
            this.props.getProfileUserDetails(profilename);
            this.props.getDetails(profilename);
            this.props.getEducationList(profilename);
            this.props.getJobList(profilename);

            const { username } = this.props;

            if (profilename === username) {
                this.state = {
                    ownProfile: true,
                    publicMode: false,
                }
            }
            else {
                this.state = {
                    ownProfile: false,
                    publicMode: true,
                }
            }
        }
    )

    handlePageChange = (e, { activePage }) => {
        const { profilename } = this.props.match.params;
        this.setState({ activePage });
        this.props.getProjects(profilename, activePage);
        window.scrollTo(0, 0);
    }

    render() {
        const { profilename } = this.props.match.params;

        this.loadProfile(profilename);

        const { projectCount } = this.props;
        let numberOfPages = Math.ceil(projectCount / 12); // Retrieved Page Size (Number of Projects per page) is 12.

        const { ownProfile, publicMode } = this.state;

        const panes = [
            {
                menuItem: 'Projects',
                render: () => (
                    <Tab.Pane attached>
                        <div className={styles.projectListContainer}>
                            {
                                (projectCount === 0) ?
                                    <Message floating>
                                        No projects added yet!
                                     </Message>
                                    :
                                    <ProjectListTiles
                                        projects={this.props.projectList}
                                        own={ownProfile} public={publicMode}
                                        itemsPerRow={3}
                                    />
                            }
                        </div>


                        <Container className={styles.pagination}>
                            <Pagination
                                activePage={this.state.activePage}
                                totalPages={numberOfPages}
                                onPageChange={this.handlePageChange}
                                boundaryRange={1}
                            />
                        </Container>
                    </Tab.Pane>
                ),
            },
            {
                menuItem: 'Profile',
                render: () => (
                    <Tab.Pane attached>
                        <ProfileTab profileDetails={this.props.profileDetails} own={ownProfile} public={publicMode} />
                    </Tab.Pane>
                ),
            },
            {
                menuItem: 'Teammates',
                render: () => <Tab.Pane attached>No Teammates!</Tab.Pane>,
            },
        ];

        return (
            <div style={{ minHeight: '100vh' }}>
                <ScrollToTopOnMount />
                <Container style={{ marginTop: '5em' }}>
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <ProfileRegularInfo own={ownProfile} public={publicMode} />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div >
        )
    }
}

function mapStateToProps(state) {
    let { projectList, profileDetails, projectCount } = state.profile;
    let { username } = state.users;

    return {
        projectList,
        projectCount,
        profileDetails,
        username,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setProfileUsername: (username) => dispatch(profileActions.setCurrentProfileName(username)),
        getProjects: (profileName, pageNumber) => dispatch(profileActions.getProjects(profileName, pageNumber)),
        getDetails: (profileName) => dispatch(profileActions.getDetails(profileName)),
        getEducationList: (profileName) => dispatch(profileActions.getEducationList(profileName)),
        getJobList: (profileName) => dispatch(profileActions.getJobList(profileName)),
        getProfileUserDetails: (profileName) => dispatch(profileActions.getUserDetails(profileName)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);