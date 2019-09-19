import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Button, Icon, Header, Label } from "semantic-ui-react";
import { profileActions } from '../../_actions';

class Skills extends Component {
    state = {
        specializedEditable: false,
        softwareSkillEditable: false,
        specializedIn: "",
        softwareSkills: "",
    }

    toggleSpecializedEdit = () => {
        this.setState({
            specializedEditable: !this.state.specializedEditable,
            specializedIn: this.props.profileDetails.specialized_in,
        });
    }

    toggleSoftwareEdit = () => {
        this.setState({
            softwareSkillEditable: !this.state.softwareSkillEditable,
            softwareSkills: this.props.profileDetails.software_skills,
        });
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }


    handleSpecializedInUpdate = () => {
        this.props.updateSpecializedIn(this.props.username, this.state.specializedIn);
        this.setState({ specializedEditable: !this.state.specializedEditable, });
    }

    handleSoftwareSkillsUpdate = () => {

    }


    render() {
        const { own, profileDetails, } = this.props;
        const { specializedEditable, softwareSkillEditable, } = this.state;

        let specializedInList =
            profileDetails.specialized_in
                .split(';')
                .filter(d => (d !== ""));

        let specializedInRender = specializedInList.map((specializedIn) => (
            <Label key={specializedIn}>{specializedIn}</Label>
        ))

        let softwareSkillsList =
            profileDetails.software_skills
                .split(';')
                .filter(d => (d !== ""));

        let softwareSkillsRender = softwareSkillsList.map((softwareSkills) => (
            <Label key={softwareSkills}>{softwareSkills}</Label>
        ))

        return (
            <div>
                <Header as="h3" dividing>Specialized In</Header>
                {own &&
                    <Button icon circular floated="right" size="tiny" onClick={this.toggleSpecializedEdit}>
                        <Icon name='edit outline' />
                    </Button>
                }

                {specializedInRender
                    ||
                    <p>No specialties added</p>
                }

                {specializedEditable &&
                    <Form onSubmit={this.handleSpecializedInUpdate}>
                        <Form.TextArea
                            name="specializedIn"
                            onChange={this.handleChange}
                            label='Add specailties (Separate with ; )'
                            value={this.state.specializedIn}
                            placeholder="Add your specialties"
                        />
                        <Form.Button>Submit</Form.Button>
                    </Form>
                }

                <Header as="h3" dividing content="Software Skills" />
                {own &&
                    <Button icon circular floated="right" size="mini" onClick={this.toggleSoftwareEdit}>
                        <Icon name='edit outline' />
                    </Button>
                }

                {softwareSkillsRender
                    ||
                    <p>No skills added</p>
                }

                {softwareSkillEditable &&
                    <Form onSubmit={this.handleSoftwareSkillsUpdate}>
                        <Form.TextArea
                            name="softwareSkills"
                            onChange={this.handleChange}
                            label='Add specailties (Separate with ; )'
                            placeholder="Add your specialties"
                            value={this.state.softwareSkills}
                        />
                        <Form.Button>Submit</Form.Button>
                    </Form>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { profileDetails } = state.profile;
    let { username } = state.users;
    return {
        profileDetails,
        username,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateSpecializedIn: (username, specializedIn) => dispatch(profileActions.updateSpecializedIn(username, specializedIn)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
