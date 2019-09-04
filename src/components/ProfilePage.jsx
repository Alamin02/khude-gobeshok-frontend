import React, { Component } from 'react'
import { Container, Grid, Tab, Image, Menu, Segment, Header, Divider } from "semantic-ui-react";
import { connect } from "react-redux";

import { profileActions } from "../_actions";

import ProjectListTiles from "./ProjectListTiles";

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        const { profilename } = this.props.match.params;

        this.props.getProjects(profilename);

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
                        <Header as="h4" dividing>Personal Details</Header>
                        <Segment color="grey" >
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <p><b>Name</b></p>
                                        <p>Md. Irfan Khan</p>
                                        <p><b>Email</b></p>
                                        <p>irfan@khudegobeshok.com</p>
                                        <p><b>Phone Number</b></p>
                                        <p>+88 0176 420 420</p>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <p><b>Country</b></p>
                                        <p>Bangladesh</p>
                                        <p><b>Address</b></p>
                                        <p>Mirpur-1, Block-C, Road-11, House-6, Dhaka 1216</p>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                        <Header as="h4" dividing>Education</Header>
                        <Segment color="grey" >
                            <Header as="h4">Ahsanullah University of Engineering and Technology</Header>
                            <p>BSc. Mechanical Engineering</p>
                        </Segment>
                        <Header as="h4" dividing>Job experience</Header>
                        <Segment color="grey" >
                            <Header as="h4">Walton DigiTech Industries Ltd.</Header>
                            <p>Assistant Director, Computer RnD</p>
                            <p>June 2017 - Continuing</p>
                        </Segment>
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
                <Container t style={{ marginTop: '5em' }}>
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
    let { projectList } = state.profile;

    return {
        projectList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProjects: (profileName) => dispatch(profileActions.getProjects(profileName)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);