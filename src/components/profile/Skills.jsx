import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Icon, Header, Label, Segment, Message } from "semantic-ui-react";
import { profileActions } from '../../_actions';

import styles from "./Skills.module.css";

class Skills extends Component {
    state = {
        specializedEditable: false,
        softwareSkillEditable: false,
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
        this.props.updateSoftwareSkill(this.props.username, this.state.softwareSkills);
        this.setState({ softwareSkillEditable: !this.state.softwareSkillEditable, })
    }


    render() {
        const { own, profileDetails, } = this.props;
        const { specializedEditable, softwareSkillEditable, } = this.state;

        let specializedInList =
            profileDetails.specialized_in
                .split(',')
                .filter(d => (d !== ""));

        let specializedInRender = specializedInList.map((specializedIn) => (
            <Label className={styles.skillLabels} key={specializedIn}>{specializedIn}</Label>
        ))

        let softwareSkillsList =
            profileDetails.software_skills
                .split(',')
                .filter(d => (d !== ""));

        let softwareSkillsRender = softwareSkillsList.map((softwareSkills) => (
            <Label className={styles.skillLabels} key={softwareSkills}>
                {softwareSkills}
            </Label>
        ))

        return (
            <React.Fragment>
                <Segment clearing>

                    <Header as="h3" dividing >
                        <Header.Content className={styles.skillHeader}>
                            Skillset
                            {own && <span style={{ float: 'right' }}>
                                <Icon name="plus" onClick={this.toggleSpecializedEdit} />
                            </span>}
                        </Header.Content>
                    </Header>

                    {(specializedInRender.length === 0) ? <p>No skills added</p>
                        : specializedInRender
                    }

                    {specializedEditable &&
                        <Form onSubmit={this.handleSpecializedInUpdate}>
                            <Form.TextArea
                                name="specializedIn"
                                onChange={this.handleChange}
                                label='Add specailties'
                                value={this.state.specializedIn}
                                placeholder="Add your specialties"
                            />
                            <Message size="mini">Separate with comma</Message>
                            <Form.Button>UPDATE</Form.Button>
                        </Form>
                    }
                </Segment>
                <Segment clearing>
                    <Header as="h3" dividing >
                        <Header.Content className={styles.skillHeader}>
                            Software Skills
                            {own && <span style={{ float: 'right' }}>
                                <Icon name="plus" onClick={this.toggleSoftwareEdit} />
                            </span>}
                        </Header.Content>
                    </Header>
                    {
                        (softwareSkillsRender.length === 0) ?
                            <p>No skills added</p>
                            : softwareSkillsRender
                    }

                    {
                        softwareSkillEditable &&
                        <Form onSubmit={this.handleSoftwareSkillsUpdate}>
                            <Form.TextArea
                                name="softwareSkills"
                                onChange={this.handleChange}
                                label='Add specailties'
                                placeholder="Add your specialties"
                                value={this.state.softwareSkills}
                            />
                            <Message size="mini">Separate with comma</Message>
                            <Form.Button>UPDATE</Form.Button>
                        </Form>
                    }
                </Segment>
            </React.Fragment >
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
        updateSoftwareSkill: (username, SoftwareSkills) => dispatch(profileActions.updateSoftwareSkill(username, SoftwareSkills)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
