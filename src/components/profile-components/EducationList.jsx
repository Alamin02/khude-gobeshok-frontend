import React, { Component } from 'react';
import { connect } from "react-redux";
import { profileActions } from "../../_actions";
import { Segment, Header } from "semantic-ui-react";

class EducationList extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.educationList);
    }
    render() {
        const renderEducationList = this.props.educationList.map((education, key) =>
            <Segment vertical key={key}>
                <Header as="h4">{education.institute}</Header>
                <p>{education.major}</p>
                <p>{education.degree}</p>
                <p>From {education.start_date}</p>
            </Segment>
        );

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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EducationList);
