import React, { Component } from 'react'

import { Transition, Form, Checkbox, Segment, Header, Button } from "semantic-ui-react";
import {
    MonthInput,
    YearInput,
} from 'semantic-ui-calendar-react';
import moment from "moment";
import { connect } from 'react-redux';
import { profileActions } from '../../../_actions';

function monthStringToIndex(monthString) {

    if (monthString === "Jan")
        return 0;
    else if (monthString === "Feb")
        return 1;
    else if (monthString === "Mar")
        return 2;
    else if (monthString === "Apr")
        return 3;
    else if (monthString === "May")
        return 4;
    else if (monthString === "Jun")
        return 5;
    else if (monthString === "Jul")
        return 6;
    else if (monthString === "Aug")
        return 7;
    else if (monthString === "Sep")
        return 8;
    else if (monthString === "Oct")
        return 9;
    else if (monthString === "Nov")
        return 10;
    else if (monthString === "Dec")
        return 11;
    else
        return NaN;
}


class AddJob extends Component {
    state = {
        company: "",
        position: "",
        start_month: "",
        start_year: "",
        end_month: "",
        end_year: "",
        currently_working: false,
        submit_request: false,
    }

    handleDateChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleEnrolledChange = () => {
        this.setState({ currently_working: !this.state.currently_working });
    }

    handleSubmit = () => {
        this.setState({ submit_request: true });

        const { company, position, start_month, start_year, end_month, end_year, currently_working } = this.state;

        if (company && position && start_month && start_year && ((end_year && end_month) || currently_working)) {
            let start_date = new Date();
            start_date.setFullYear(parseInt(start_year));
            start_date.setMonth(monthStringToIndex(start_month));
            start_date = moment(start_date).format('YYYY-MM-DD');

            let end_date = new Date();
            if (!currently_working) {
                end_date.setFullYear(parseInt(end_year));
                end_date.setMonth(monthStringToIndex(end_month));
                end_date = moment(end_date).format('YYYY-MM-DD');
            }
            else end_date = null;

            let job = {
                company,
                position,
                start_date,
                end_date,
                currently_working
            }
            this.props.addJob(job);

        }
    }

    render() {
        return (
            <div>
                <Transition visible={this.props.visible}>
                    <Segment>
                        <Header as="h4" dividing>Add Job</Header>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Company</label>
                                <input placeholder='Company Name' autoComplete="off" name="company" onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Position/Designation</label>
                                <input placeholder='Position/Designation Name' autoComplete="off" name="position" onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Group inline>
                                <label>Start Date</label>
                                <MonthInput name="start_month" autoComplete="off" value={this.state.start_month} onChange={this.handleDateChange} placeholder="Month" />
                                <YearInput name="start_year" autoComplete="off" value={this.state.start_year} onChange={this.handleDateChange} placeholder="Year" />
                            </Form.Group>
                            <Form.Group inline>
                                <label>End Date</label>
                                <MonthInput name="end_month" autoComplete="off" value={this.state.end_month} onChange={this.handleDateChange} placeholder="Month" />
                                <YearInput name="end_year" autoComplete="off" value={this.state.end_year} onChange={this.handleDateChange} placeholder="Year" />
                            </Form.Group>
                            <Form.Field>
                                <Checkbox label='Currently Working' name="currently_working" checked={this.state.currently_enrolled} onChange={this.handleEnrolledChange} />
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
                        </Form>
                    </Segment>
                </Transition>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        addJob: (job) => { dispatch(profileActions.addJob(job)) },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);