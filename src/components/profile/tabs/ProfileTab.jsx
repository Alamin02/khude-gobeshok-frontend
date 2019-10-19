import React, { Component } from 'react';
import { Segment, Header, Button, Icon, Grid, Transition, } from "semantic-ui-react";

import ProfileDetailsEditor from "./ProfileDetailsEditor";
import EducationList from "./EducationList";
import AddEducation from "./AddEducation";
import JobList from "./JobList";
import AddJob from "./AddJob";

import styles from "./ProfileTab.module.css";

export default class ProfileTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profileDetailsVisible: true,
            profileDetailsEditable: false,
            educationEditable: false,
            jobEditable: false,
        }
    }

    toggleProfileDetailsEdit = () => {
        this.setState({
            profileDetailsVisible: !this.state.profileDetailsVisible,
            profileDetailsEditable: !this.state.profileDetailsEditable,
        })
    }

    toggleEducationAdd = () => {
        this.setState({
            educationEditable: !this.state.educationEditable,
        })
    }

    toggleJobAdd = () => {
        this.setState({
            jobEditable: !this.state.jobEditable,
        })
    }

    render() {
        const { own } = this.props;

        return (
            <div>
                <Segment clearing vertical className={styles.headerHolder}>
                    <Header as="h3" floated="left" >
                        Personal Details
                        </Header>
                    {own &&
                        <Button icon circular floated="right" size="tiny" onClick={this.toggleProfileDetailsEdit}>
                            <Icon name='edit outline' />
                        </Button>
                    }
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

                    <ProfileDetailsEditor visible={this.state.profileDetailsEditable} />
                </Segment>

                <Segment clearing vertical className={styles.headerHolder}>
                    <Header as="h3" floated="left" >
                        Education
                    </Header>
                    {own &&
                        <Button icon circular floated="right" size="tiny" onClick={this.toggleEducationAdd}>
                            <Icon name='edit outline' />
                        </Button>
                    }
                </Segment>
                <Segment color="grey" >
                    <EducationList editable={this.state.educationEditable} />
                    <AddEducation visible={this.state.educationEditable} />
                </Segment>

                <Segment clearing vertical className={styles.headerHolder}>
                    <Header as="h3" floated="left" >
                        Job Experience
                    </Header>
                    {own &&
                        <Button icon circular floated="right" size="tiny" onClick={this.toggleJobAdd}>
                            <Icon name='edit outline' />
                        </Button>
                    }
                </Segment>
                <Segment color="grey" >
                    <JobList editable={this.state.jobEditable} />
                    <AddJob visible={this.state.jobEditable} />
                </Segment>
            </div>
        )
    }
}
