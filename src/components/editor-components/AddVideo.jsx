import React, { Component } from 'react'

import { Popup, Segment, Form, Button } from "semantic-ui-react"

export default class AddVideo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videoUrl: ""
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = () => {
        this.props.onChange(this.props.modifier(this.props.editorState, { src: this.state.videoUrl }));
    }

    render() {
        return (
            <Popup flowing
                trigger={
                    <Button icon='file video outline' content='Add Video' />
                }
                on='click'
            >
                <Form>
                    <Form.Input icon='linkify' iconPosition='left' label='URL' placeholder='URL' name="videoUrl" onChange={this.handleChange} value={this.state.videoUrl} />
                    <Button content='Add' primary onClick={this.handleSubmit} />
                </Form>
            </Popup>
        )
    }
}
