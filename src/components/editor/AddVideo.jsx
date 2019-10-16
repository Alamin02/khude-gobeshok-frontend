import React, { Component } from 'react'

import { Popup, Form, Button } from "semantic-ui-react"

export default class AddVideo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videoUrl: "",
            diagOpen: false,
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    handleDiagClose = () => {
        this.setState({ diagOpen: false })
    }
    handleDiagOpen = () => {
        this.setState({ diagOpen: true })
    }

    handleSubmit = () => {
        this.props.onChange(this.props.modifier(this.props.editorState, { src: this.state.videoUrl }));
        this.setState({
            videoUrl: "",
            diagOpen: false
        })
    }

    render() {
        return (
            <Popup flowing
                trigger={
                    <Button icon='file video outline' content='Add Video' />
                }
                on='click'
                open={this.state.diagOpen}
                onClose={this.handleDiagClose}
                onOpen={this.handleDiagOpen}
            >
                <Form>
                    <Form.Input icon='linkify' iconPosition='left' label='URL' placeholder='URL' name="videoUrl" onChange={this.handleChange} value={this.state.videoUrl} />
                    <Button content='Add' primary onClick={this.handleSubmit} />
                </Form>
            </Popup>
        )
    }
}
