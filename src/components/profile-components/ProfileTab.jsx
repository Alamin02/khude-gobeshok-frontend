import React, { Component } from 'react';
import { Segment, Header, Button, Icon, Grid, Transition, Form, Checkbox } from "semantic-ui-react";

import ProfileDetailsEditor from "./ProfileDetailsEditor";
import EducationList from "./EducationList";

const monthOptions = [
    { key: 'a', text: 'January', value: 0 },
    { key: 'b', text: 'February', value: 1 },
    { key: 'c', text: 'March', value: 2 },
    { key: 'd', text: 'April', value: 3 },
    { key: 'e', text: 'May', value: 4 },
    { key: 'f', text: 'June', value: 5 },
    { key: 'g', text: 'July', value: 6 },
    { key: 'h', text: 'August', value: 7 },
    { key: 'i', text: 'September', value: 8 },
    { key: 'j', text: 'October', value: 9 },
    { key: 'k', text: 'November', value: 10 },
    { key: 'l', text: 'December', value: 11 },
]

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

                    <Transition visible={this.state.addEducationVisible}>
                        <Segment>
                            <Header as="h4">Add Education</Header>
                            <Form>
                                <Form.Field>
                                    <label>Institute</label>
                                    <input placeholder='Institution Name' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Subject/Group/Major</label>
                                    <input placeholder='Subject/Group Name' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Degree</label>
                                    <input placeholder='Degree Name' />
                                </Form.Field>
                                <Form.Group inline>
                                    <label>Start Date</label>
                                    <Form.Select options={monthOptions} placeholder='Month' />
                                    <Form.Select options={monthOptions} placeholder='Month' />

                                </Form.Group>
                                <Form.Field>
                                    <Checkbox label='Currently Studying' />
                                </Form.Field>
                                <Button type='submit'>Submit</Button>
                            </Form>
                        </Segment>

                    </Transition>
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
                    <Header as="h4">Walton DigiTech Industries Ltd.</Header>
                    <p>Assistant Director, Computer RnD</p>
                    <p>June 2017 - Continuing</p>
                </Segment>
            </div>
        )
    }
}
