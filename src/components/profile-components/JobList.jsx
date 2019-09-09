import React, { Component } from 'react';
import { connect } from "react-redux";
import { Segment, Header } from "semantic-ui-react";

class JobList extends Component {

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
                <div>
                    <Segment vertical key={key}>
                        <Header as="h4">{job.company}</Header>
                        <p>{job.position}</p>
                        <p>{start_month} {start_year} - {job.currently_working ? "Continuing" : end_date_string}</p>
                    </Segment>
                </div>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobList);