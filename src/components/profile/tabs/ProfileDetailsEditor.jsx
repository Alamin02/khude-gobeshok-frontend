import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Transition, Button } from "semantic-ui-react";
import { profileActions, } from "../../../_actions";

class ProfileDetailsEditor extends Component {

    state = {
        full_name: this.props.profileDetails.full_name,
        country: this.props.profileDetails.country,
        phone_number: this.props.profileDetails.phone_number,
        address: this.props.profileDetails.address,
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let updatedProfileDetails = this.state;
        let { updateDetails, username } = this.props;

        updateDetails(username, updatedProfileDetails);
    }

    render() {
        return (
            <div>
                <Transition visible={this.props.visible}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid
                                id='form-subcomponent-shorthand-input-name'
                                label='Name'
                                placeholder='Enter Name'
                                name='full_name'
                                onChange={this.handleChange}
                                value={this.state.full_name || ""}
                            />
                            <Form.Input
                                fluid
                                id='form-subcomponent-shorthand-input-last-name'
                                label='Country'
                                placeholder='Enter Country'
                                name='country'
                                onChange={this.handleChange}
                                value={this.state.country || ""}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid
                                id='form-subcomponent-shorthand-input-name'
                                label='Phone number'
                                placeholder='Enter Phone Number'
                                name='phone_number'
                                onChange={this.handleChange}
                                value={this.state.phone_number || ""}
                            />
                            <Form.Input
                                fluid
                                id='form-subcomponent-shorthand-input-last-name'
                                label='Address'
                                placeholder='Enter Address'
                                name='address'
                                onChange={this.handleChange}
                                value={this.state.address || ""}
                            />
                        </Form.Group>
                        <Button type='submit'>Update</Button>
                    </Form>
                </Transition>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { profileDetails } = state.profile;
    let { username } = state.users;

    return {
        profileDetails,
        username,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateDetails: (username, updatedProfileDetails) => { dispatch(profileActions.updateDetails(username, updatedProfileDetails)) }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetailsEditor);