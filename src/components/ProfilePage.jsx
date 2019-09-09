import React, { Component } from 'react'
import { Container, Grid, Tab, Image, Segment, Header, Divider, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

import { profileActions } from "../_actions";

import ProjectListTiles from "./ProjectListTiles";
import ProfileTab from "./profile-components/ProfileTab";

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        const { profilename } = this.props.match.params;

        this.props.getProjects(profilename);
        this.props.getDetails(profilename);
        this.props.getEducationList(profilename);
        this.props.getJobList(profilename);

    }


    render() {
        const { profilename } = this.props.match.params;

        const panes = [
            {
                menuItem: 'Projects',
                render: () => (
                    <Tab.Pane attached>
                        <ProjectListTiles projects={this.props.projectList} />
                    </Tab.Pane>
                ),
            },
            {
                menuItem: 'Profile',
                render: () => (
                    <Tab.Pane attached>
                        <ProfileTab profileDetails={this.props.profileDetails} />
                    </Tab.Pane>
                ),
            },
            {
                menuItem: 'Teammates',
                render: () => <Tab.Pane attached>Yet to come</Tab.Pane>,
            },
        ]
        return (
            <div style={{ minHeight: '100vh' }}>
                <Container style={{ marginTop: '5em' }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Segment textAlign="center">
                                    <Image src="https://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg" size="small" circular centered />
                                    <Header as="h3" content={profilename} subheader="Tell us about yourself in one line"></Header>
                                    <Divider />
                                    <p>From: Bangladesh</p>
                                    <p>Member Since: Aug 2019</p>
                                    <Divider />
                                </Segment>

                                <Segment>
                                    <Header as="h3" dividing content="Your Badges" />
                                    <p>No badges yet</p>

                                </Segment>

                                <Segment>
                                    <Header as="h3" dividing content="Specialized in" />
                                    <p>No specialties added</p>
                                    <Header as="h3" dividing content="Software Skills" />
                                    <p>No skills added</p>
                                </Segment>

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

    return {
        projectList,
        profileDetails,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProjects: (profileName) => dispatch(profileActions.getProjects(profileName)),
        getDetails: (profileName) => dispatch(profileActions.getDetails(profileName)),
        getEducationList: (profileName) => { dispatch(profileActions.getEducationList(profileName)) },
        getJobList: (profileName) => { dispatch(profileActions.getJobList(profileName)) },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);