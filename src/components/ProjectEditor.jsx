import React, { Component } from 'react';
import { Container, Form, Header, Grid, Select, Button, Transition, Label, Popup } from "semantic-ui-react";

import { connect } from 'react-redux';

import Previews from "./ImageDragnDrop";
import ProjectDetails from "./editor-components/ProjectDetails";
import EditorSteps from "./editor-components/EditorSteps";
import Review from "./editor-components/Review";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { editorActions } from "../_actions"

const options = [
    { key: 'm', text: 'Not Applicable', value: 'male' },
    { key: 'f', text: 'Not Applicable', value: 'female' },
    { key: 'o', text: 'Not Applicabler', value: 'other' },
]


class ProjectEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibility: [true, false, false],
            currentStep: 1,
            nextDisable: false,
            prevDisable: true,
            btnPress: "",
            titleEmptyWarning: false
        }
    }

    handleNext = () => {
        let newVisibility = [];
        let nextStep = this.state.currentStep;
        let nextDisable = false;
        let prevDisable = true;

        if (this.state.currentStep === 1 && this.state.btnPress === "next") {
            nextStep = nextStep + 1;
            newVisibility = [false, true, false];
            nextDisable = false;
            prevDisable = false;
        }

        else if (this.state.currentStep === 2 && this.state.btnPress === "next") {
            nextStep = nextStep + 1;
            newVisibility = [false, false, true];
            nextDisable = true;
            prevDisable = false;
        }

        else if (this.state.currentStep === 2 && this.state.btnPress === "prev") {
            nextStep = nextStep - 1;
            newVisibility = [true, false, false];
            nextDisable = false;
            prevDisable = true;
        }

        else if (this.state.currentStep === 3 && this.state.btnPress === "prev") {
            nextStep = nextStep - 1;
            newVisibility = [false, true, false];
            nextDisable = false;
            prevDisable = false;
        }

        this.setState({
            visibility: newVisibility,
            currentStep: nextStep,
            nextDisable: nextDisable,
            prevDisable: prevDisable,
        });
    }

    handleHide = (button) => {
        if (button === "next" && this.state.currentStep === 1) {
            if (this.props.title === "") {
                this.setState({
                    titleEmptyWarning: true,
                });
                return 0;
            }
        }
        this.setState({
            visibility: [false, false, false],
            btnPress: button
        });
    }

    render() {
        const introVisible = this.state.visibility[0];
        const detailsVisible = this.state.visibility[1];
        const reviewVisible = this.state.visibility[2];

        return (
            <div >
                <Container >
                    <Header as='h1' textAlign="center" style={{
                        marginTop: "10vh"
                    }}>Project Editor</Header>
                    <Grid centered columns={2}>
                        <Grid.Column >
                            <EditorSteps currentStep={this.state.currentStep} />

                        </Grid.Column>
                    </Grid>
                </Container>
                <Container text style={{ paddingTop: "50px", paddingBottom: "50px" }}>
                    <Transition unmountOnHide visible={introVisible} animation='scale' duration={500} onHide={this.handleNext}>
                        <Form>
                            <Form.Field>

                                <label>Project Title</label>
                                <input autoComplete="off" placeholder="Enter your awesome project title" name="title" value={this.props.title} onChange={e => this.props.titleChange(e.target.value)}></input>
                                {this.state.titleEmptyWarning && <Label basic color='red' pointing> Please enter a Title </Label>}
                            </Form.Field>

                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Field>
                                            <label>Thumbnail</label>
                                            <Previews key="1" imageChange={this.props.thumbnailChange} />
                                        </Form.Field>
                                    </Grid.Column>
                                    <Grid.Column>
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
                                        <Form.Field
                                            control={Select}
                                            label='Category'
                                            options={options}
                                            placeholder='Category (Not implemented)'
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                        </Form>
                    </Transition>
                    <Transition unmountOnHide visible={detailsVisible} animation="scale" duration={500} onHide={this.handleNext}>
                        <Form>
                            <Form.Field>
                                <Popup trigger={<Button circular icon='question circle outline' floated="right" />} flowing hoverable position="bottom right" >
                                    <Header as="h3">Suggested Sections</Header>
                                    <ul>
                                        <li><b>Introduction:</b> <br /> Give an overall introduction and objectives of your project.</li>
                                        <li><b>Raw material list:</b> <br /> Mention the parts used in this project</li>
                                        <li><b>Machine or Tools used in this project:</b> <br /> Mention the machine and tools list used in this project</li>
                                        <li><b>Design and Drawing:</b> <br /> Provide image of CAD design / Circuit design</li>
                                        <li><b>Working method:</b> <br /> Mention working methodology of your project
                                        <br /> Share video link of your project if needed
                                        <br /> Upload Pictures if required
                                        </li>
                                        <li><b>Application:</b> <br /> In which way your project will impact in real life</li>
                                    </ul>
                                </Popup>

                                <label>Project Details</label>
                                <ProjectDetails />
                            </Form.Field>
                        </Form>
                    </Transition>
                    <Transition unmountOnHide visible={reviewVisible} animation="scale" duration={500} onHide={this.handleNext}>
                        <Review />
                    </Transition>
                    <Grid style={{ marginTop: "3em" }}>
                        <Grid.Column textAlign="center">
                            <Button.Group className="mhyaskldjal">
                                <Button labelPosition='left' icon='left chevron' content='Previous' onClick={() => this.handleHide("prev")} disabled={this.state.prevDisable} />
                                <Button labelPosition='right' icon='right chevron' content='Next' onClick={() => this.handleHide("next")} disabled={this.state.nextDisable} />
                            </Button.Group>
                        </Grid.Column>
                    </Grid>

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