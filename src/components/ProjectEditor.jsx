import React, { Component } from 'react';
import { Container, Form, Header } from "semantic-ui-react";

import { connect } from 'react-redux';

import Previews from "./ImageDragnDrop";
import ProjectDetails from "./editor-components/ProjectDetails";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { editorActions } from "../_actions"

class ProjectEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
        };
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }
    handleStartDateChange(date) {
        this.setState({
            startDate: date
        })
    }
    handleEndDateChange(date) {
        this.setState({
            endDate: date
        })
    }
    render() {
        return (
            <div >
                <Container text style={{
                    marginTop: "10vh"
                }}>
                    <Header as='h1' textAlign="center">PROJECT EDITOR</Header>
                    <Form>
                        <Form.Field>
                            <label>Project Title</label>
                            <input placeholder="Enter your awesome project title" name="title" value={this.props.title} onChange={e => this.props.titleChange(e.target.value)}></input>
                        </Form.Field>
                        <Form.Field>
                            <label>Cover Image</label>
                            <Previews key="1" imageChange={this.props.thumbnailChange} />
                        </Form.Field>
                        <Form.Group>
                            <Form.Field>
                                <label>Start Date</label>
                                <DatePicker name="date1"
                                    selected={this.props.startDate}
                                    onChange={date => this.props.startDateChange(date)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>End Date</label>
                                <DatePicker
                                    selected={this.props.endDate}
                                    onChange={date => this.props.endDateChange(date)}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label>Project Details</label>
                            <ProjectDetails />
                        </Form.Field>
                    </Form>
                </Container >

            </div >
        )
    }
}

function mapStateToProps(state) {
    let { editor } = state;
    return {
        title: editor.title,
        startDate: editor.startDate,
        endDate: editor.endDate,
    }
};
function mapDispatchToProps(dispatch) {
    return {
        init: () => dispatch(editorActions.init()),
        titleChange: (title) => dispatch(editorActions.title_change(title)),
        thumbnailChange: (image) => dispatch(editorActions.thumbnail_change(image)),
        startDateChange: (date) => dispatch(editorActions.start_date_change(date)),
        endDateChange: (date) => dispatch(editorActions.end_date_change(date)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditor);