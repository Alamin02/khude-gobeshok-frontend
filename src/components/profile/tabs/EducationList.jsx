import React, { Component } from 'react';
import { connect } from "react-redux";
import { profileActions } from "../../../_actions";
import { Segment, Header, Button, Icon } from "semantic-ui-react";
import moment from "moment";

class EducationList extends Component {

    handleDelete = (id) => {
        this.props.deleteEducation(id);
    }

    render() {

        const renderEducationList = this.props.educationList.map((education, key) => {
            const { editable } = this.props;

            const { start_date, end_date } = education;

            return (
                <Segment vertical key={key}>
                    <Header as="h4">
                        {education.institute}
                    </Header>

                    {editable &&
                        <Button floated="right" onClick={() => { this.handleDelete(education.id) }}>
                            <Button.Content >
                                <Icon name="trash alternate" />
                            </Button.Content>
                        </Button>
                    }

                    <p>{education.degree} - {education.major}</p>
                    <p>{moment(start_date).format("MMM YYYY")} - {education.currently_enrolled ? "Continuing" : moment(end_date).format("MMM YYYY")}</p>
                </Segment>
            )
        });

        return (
            <div>
                {(renderEducationList.length === 0) ? <p>No education info added.</p> : renderEducationList}
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
