import React, { Component } from 'react';
import { connect } from "react-redux";
import { Segment, Header, Button, Icon } from "semantic-ui-react";
import { profileActions } from "../../../_actions";
import moment from "moment";

class JobList extends Component {

    handleDelete = (id) => {
        this.props.deleteJob(id);
    }

    render() {
        const renderJobList = this.props.jobList.map((job, key) => {
            const { editable } = this.props;
            const { start_date, end_date } = job;

            return (
                <Segment vertical key={key}>
                    <Header as="h4">{job.company}</Header>
                    {editable &&
                        <Button floated="right" onClick={() => { this.handleDelete(job.id) }}>
                            <Button.Content >
                                <Icon name="trash alternate" />
                            </Button.Content>
                        </Button>
                    }
                    <p>{job.position}</p>
                    <p>{moment(start_date).format("MMM YYYY")} - {job.currently_working ? "Continuing" : moment(end_date).format("MMM YYYY")}}</p>
                </Segment>
            )
        });

        return (
            <div>
                {(renderJobList.length === 0) ? <p>No job info added.</p> : renderJobList}
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