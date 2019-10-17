import React, { Component } from 'react';
import { Transition, Form, Checkbox, Segment, Header, Button } from "semantic-ui-react";
import {
    MonthInput,
    YearInput,
} from 'semantic-ui-calendar-react';
import moment from "moment";
import { connect } from 'react-redux';
import { profileActions } from '../../_actions';

// Function conveting month input to index
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

class AddEducation extends Component {
    state = {
        institute: "",
        major: "",
        degree: "",
        start_month: "",
        start_year: "",
        end_month: "",
        end_year: "",
        currently_enrolled: false,
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
        this.setState({ currently_enrolled: !this.state.currently_enrolled });
    }

    handleSubmit = () => {
        this.setState({ submit_request: true });
        const { institute, degree, major, start_month, start_year, end_month, end_year, currently_enrolled } = this.state;

        // Validation (Checking if all fields filled up)
        if (institute && degree && major && start_month && start_year && ((end_year && end_month) || currently_enrolled)) {
            // Make a JS date from input year and month
            let start_date = new Date();
            start_date.setFullYear(parseInt(start_year));
            start_date.setMonth(monthStringToIndex(start_month));
            start_date = moment(start_date).format('YYYY-MM-DD');

            let end_date = new Date();
            if (!currently_enrolled) {
                end_date.setFullYear(parseInt(end_year));
                end_date.setMonth(monthStringToIndex(end_month));
                end_date = moment(end_date).format('YYYY-MM-DD');
            }
            else end_date = null;

            let education = {
                institute,
                degree,
                major,
                start_date,
                end_date,
                currently_enrolled
            }

            this.props.addEducation(education);
        }
    }

    render() {
        return (
            <div>
                <Transition visible={this.props.visible}>
                    <Segment>
                        <Header as="h4" dividing>Add Education</Header>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Institute</label>
                                <input placeholder='Institution Name' autoComplete="off" name="institute" onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Subject/Group/Major</label>
                                <input placeholder='Subject/Group Name' autoComplete="off" name="major" onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Degree</label>
                                <input placeholder='Degree Name' name="degree" autoComplete="off" onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Group inline>
                                <label>Start Date</label>
                                <MonthInput name="start_month" value={this.state.start_month} autoComplete="off" onChange={this.handleDateChange} placeholder="Month" />
                                <YearInput name="start_year" value={this.state.start_year} autoComplete="off" onChange={this.handleDateChange} placeholder="Year" />
                            </Form.Group>
                            <Form.Group inline>
                                <label>End Date</label>
                                <MonthInput name="end_month" value={this.state.end_month} autoComplete="off" onChange={this.handleDateChange} placeholder="Month" />
                                <YearInput name="end_year" value={this.state.end_year} autoComplete="off" onChange={this.handleDateChange} placeholder="Year" />
                            </Form.Group>
                            <Form.Field>
                                <Checkbox label='Currently Studying' name="currently_enrolled" checked={this.state.currently_enrolled} onChange={this.handleEnrolledChange} />
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
        addEducation: (education) => { dispatch(profileActions.addEducation(education)) },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEducation);