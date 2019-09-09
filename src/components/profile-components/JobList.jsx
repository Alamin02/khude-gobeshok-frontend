import React, { Component } from 'react';
import { connect } from "react-redux";
import { Segment, Header, Button } from "semantic-ui-react";
import { profileActions } from "../../_actions";

class JobList extends Component {

    handleDelete = (id) => {
        this.props.deleteJob(id);
    }

    render() {
        const renderJobList = this.props.jobList.map((job, key) => {
            const { start_date, end_date } = job;
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
                    <Header as="h4">{job.company}</Header>
                    <Button floated="right" onClick={() => { this.handleDelete(job.id) }}>Delete</Button>
                    <p>{job.position}</p>
                    <p>{start_month} {start_year} - {job.currently_working ? "Continuing" : end_date_string}</p>
                </Segment>
            )
        });

        return (
            <div>
                {renderJobList}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { jobList } = state.profile;
    return {
        jobList,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteJob: (id) => { dispatch(profileActions.deleteJob(id)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobList);