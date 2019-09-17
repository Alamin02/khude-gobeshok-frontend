import React, { Component } from 'react'
import { Container, Grid, Tab, Image, Segment, Header, Divider, Button, Icon, Dimmer } from "semantic-ui-react";
import { connect } from "react-redux";
import memoize from "memoize-one";
import { profileActions } from "../_actions";

import ProjectListTiles from "./ProjectListTiles";
import ProfileTab from "./profile-components/ProfileTab";
import ProfileRegularInfo from "./profile-components/ProfileRegularInfo";
import styles from "./ProfilePage.module.css";

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        const { profilename } = this.props.match.params;
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

    loadProfile = memoize(
        (profilename) => {
            this.props.getProjects(profilename);
            this.props.getProfileUserDetails(profilename);
            this.props.getDetails(profilename);
            this.props.getEducationList(profilename);
            this.props.getJobList(profilename);
        }
    )

    render() {
        const { profilename } = this.props.match.params;

        this.loadProfile(profilename);

        const { ownProfile, publicMode } = this.state;

        const panes = [
            {
                menuItem: 'Projects',
                render: () => (
                    <Tab.Pane attached>
                        <ProjectListTiles projects={this.props.projectList} own={ownProfile} public={publicMode} />
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
    let { projectList, profileDetails } = state.profile;
    let { username } = state.users;

    return {
        projectList,
        profileDetails,
        username,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProjects: (profileName) => dispatch(profileActions.getProjects(profileName)),
        getDetails: (profileName) => dispatch(profileActions.getDetails(profileName)),
        getEducationList: (profileName) => dispatch(profileActions.getEducationList(profileName)),
        getJobList: (profileName) => dispatch(profileActions.getJobList(profileName)),
        getProfileUserDetails: (profileName) => dispatch(profileActions.getUserDetails(profileName)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);