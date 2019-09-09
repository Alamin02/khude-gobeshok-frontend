import React, { Component } from 'react';
import { Segment, Header, Button, Icon, Grid, Transition, } from "semantic-ui-react";

import ProfileDetailsEditor from "./ProfileDetailsEditor";
import EducationList from "./EducationList";
import AddEducation from "./AddEducation";
import JobList from "./JobList";

export default class ProfileTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profileDetailsVisible: true,
            profileDetailsEditVisible: false,
            addEducationVisible: false,
        }
    }

    toggleProfileDetailsEdit = () => {
        this.setState({
            profileDetailsVisible: !this.state.profileDetailsVisible,
            profileDetailsEditVisible: !this.state.profileDetailsEditVisible,
        })
    }

    toggleEducationAdd = () => {
        this.setState({
            addEducationVisible: !this.state.addEducationVisible,
        })
    }

    render() {
        return (
            <div>
                <Segment clearing vertical>
                    <Header as="h3" floated="left" >
                        Personal Details
                        </Header>
                    <Button icon circular floated="right" size="tiny" onClick={this.toggleProfileDetailsEdit}>
                        <Icon name='edit outline' />
                    </Button>
                </Segment>

                <Segment color="grey" >
                    <Transition visible={this.state.profileDetailsVisible}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <p><b>Name</b></p>
                                    <p>{this.props.profileDetails.full_name || "Name unknown"}</p>
                                    <p><b>Phone Number</b></p>
                                    <p>{this.props.profileDetails.phone_number || "Phone Number unknown"}</p>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <p><b>Country</b></p>
                                    <p>{this.props.profileDetails.country || "Country unknown"}</p>
                                    <p><b>Address</b></p>
                                    <p>{this.props.profileDetails.address || "Address unknown"}</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Transition>

                    <ProfileDetailsEditor visible={this.state.profileDetailsEditVisible} />
                </Segment>

                <Segment clearing vertical>
                    <Header as="h3" floated="left" >
                        Education
                        </Header>
                    <Button icon circular floated="right" size="tiny" onClick={this.toggleEducationAdd}>
                        <Icon name='edit outline' />
                    </Button>
                </Segment>
                <Segment color="grey" >
                    <EducationList />
                    <AddEducation visible={this.state.addEducationVisible} />
                </Segment>

                <Segment clearing vertical>
                    <Header as="h3" floated="left" >
                        Job Experience
                        </Header>
                    <Button icon circular floated="right" size="tiny">
                        <Icon name='edit outline' />
                    </Button>
                </Segment>
                <Segment color="grey" >
                    <JobList />
                </Segment>
            </div>
        )
    }
}
