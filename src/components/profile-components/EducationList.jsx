import React, { Component } from 'react';
import { connect } from "react-redux";
import { profileActions } from "../../_actions";
import { Segment, Header, Button } from "semantic-ui-react";

class EducationList extends Component {

    handleDelete = (id) => {
        this.props.deleteEducation(id);
    }

    render() {

        const renderEducationList = this.props.educationList.map((education, key) => {
            const { start_date, end_date } = education;
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            let d = new Date(start_date);
            let start_month = monthNames[d.getMonth()];
            let start_year = d.getFullYear();

            let d2 = new Date(end_date);
            let end_month = monthNames[d2.getMonth()];
            let end_year = d2.getFullYear().toString();

            let end_date_string = end_month + " " + end_year;

            return (
                <Segment vertical key={key}>
                    <Header as="h4">{education.institute}</Header>
                    <Button floated="right" onClick={() => { this.handleDelete(education.id) }}>Delete</Button>
                    <p>{education.degree} - {education.major}</p>
                    <p>{start_month} {start_year} - {education.currently_enrolled ? "Continuing" : end_date_string}</p>
                </Segment>
            )
        });

        return (
            <div>
                {renderEducationList}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { educationList } = state.profile;
    return {
        educationList,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteEducation: (id) => { dispatch(profileActions.deleteEducation(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EducationList);
