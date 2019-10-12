import React, { Component } from 'react';
import { Container, Form, Header, Grid, Select, Button, Transition, Label, Popup } from "semantic-ui-react";

import { connect } from 'react-redux';

import Previews from "../common/ImageDragnDrop";
import ProjectDetails from "./ProjectDetails";
import EditorSteps from "./EditorSteps";
import Review from "./Review";
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { editorActions } from "../../_actions"
import styles from "./ProjectEditorPage.module.css";


class ProjectEditor extends Component {
    constructor(props) {
        super(props);

        this.props.init(this.props.author);

        this.state = {
            visibility: [true, false, false],
            currentStep: 1,
            nextDisable: false,
            prevDisable: true,
            btnPress: "",
            titleEmptyWarning: false,
            thumbnailEmptyWarning: false,
            title: this.props.title,
            teammates: this.props.teammates,
            tags: this.props.tags,
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
        console.log(this.state);
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
        // Validate metadata form on next click on first step
        // If validated, update store and then proceed to next
        // Else shows the error messages
        if (button === "next" && this.state.currentStep === 1) {
            if (this.state.title === "") {
                this.setState({
                    titleEmptyWarning: true,
                });
                return 0;
            }
            else if (!this.props.thumbnail) {
                this.setState({
                    thumbnailEmptyWarning: true,
                });
                return 0;
            }
            else {
                this.setState({
                    titleEmptyWarning: false,
                    thumbnailEmptyWarning: false,
                });

                this.props.editorMetaDataChange({
                    title: this.state.title,
                    teammates: this.state.teammates,
                    tags: this.state.tags,
                })
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
            <div>
                <ScrollToTopOnMount />
                <div className={styles.pageHeaderContainer} >
                    <Header as='h1' textAlign="center" className={styles.pageHeader} icon>
                        <Header.Content>Project Editor</Header.Content>
                    </Header>
                </div>

                <Container text>
                    <EditorSteps currentStep={this.state.currentStep} />
                </Container>

                <Container text style={{ paddingTop: "50px", paddingBottom: "50px" }}>
                    <Transition unmountOnHide visible={introVisible} animation='scale' duration={500} onHide={this.handleNext}>
                        <Form>
                            <Form.Field>
                                <label>Project Title</label>
                                <input
                                    autoComplete="off"
                                    placeholder="Enter your awesome project title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                />
                                {this.state.titleEmptyWarning && <Label key="title" basic color='red' pointing> Please enter a Title </Label>}
                            </Form.Field>

                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Field>
                                            <label>Thumbnail</label>
                                            <Previews
                                                key="1"
                                                imageChange={this.props.thumbnailChange}
                                                url={this.props.thumbnail}
                                            />
                                            {this.state.thumbnailEmptyWarning && <Label key="thumbnail" basic color='red' pointing> Please upload a thumbnail </Label>}
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

                                        <Form.Field>
                                            <label>Tags</label>
                                            <input
                                                placeholder="Enter tags seperated with comma"
                                                value={this.state.tags}
                                                name="tags"
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Teammates</label>
                                            <input
                                                value={this.state.teammates}
                                                name="teammates"
                                                placeholder="Enter teammate names seperated with comma"
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>

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
                                <Button
                                    labelPosition='left'
                                    icon='left chevron'
                                    content='Previous'
                                    onClick={() => this.handleHide("prev")}
                                    disabled={this.state.prevDisable}
                                />
                                <Button
                                    labelPosition='right'
                                    icon='right chevron'
                                    content='Next'
                                    onClick={() => this.handleHide("next")}
                                    disabled={this.state.nextDisable}
                                />
                            </Button.Group>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div >
        )
    }
}

function mapStateToProps(state) {
    let { editor } = state;
    let { username } = state.users;

    return {
        title: editor.title,
        startDate: editor.startDate,
        endDate: editor.endDate,
        thumbnail: editor.thumbnail,
        author: username,
        teammates: editor.teammates,
        tags: editor.tags,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        init: (author) => dispatch(editorActions.init(author)),
        thumbnailChange: (image) => dispatch(editorActions.thumbnailChange(image)),
        startDateChange: (date) => dispatch(editorActions.startDateChange(date)),
        endDateChange: (date) => dispatch(editorActions.endDateChange(date)),
        editorMetaDataChange: (metadata) => dispatch(editorActions.editorMetaDataChange(metadata)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditor);