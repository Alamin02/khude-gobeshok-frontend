import React, { Component } from 'react'

import { Popup, Form, Button, Tab, Segment } from "semantic-ui-react"

import ImageDnD from "../ImageDragnDrop";

import { imageService } from "../../_services"

export default class AddImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: ""
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = () => {
        this.props.onChange(this.props.modifier(this.props.editorState, this.state.imageUrl));
    }

    handleUpload = (image) => {
        imageService.image_upload(image).then(({ image }) => {
            this.setState({
                imageUrl: image
            })
        });
    }

    render() {
        const panes = [
            {
                menuItem: 'URL', render: () =>
                    <Form>
                        <Form.Input icon='linkify' iconPosition='left' label='URL' placeholder='URL' name="imageUrl" onChange={this.handleChange} value={this.state.imageUrl} />
                        <Button content='Add' primary onClick={this.handleSubmit} />
                    </Form>
            },
            {
                menuItem: 'Upload', render: () =>
                    <Form>
                        <ImageDnD key="2" imageChange={this.handleUpload} url={this.state.imageUrl} />
                        <Button content="Add" primary onClick={this.handleSubmit} />
                    </Form>
            },
        ]
        return (

            <Popup flowing
                trigger={
                    <Button icon='file image outline' content='Add Image' />
                }
                on='click'
            >
                <Segment placeholder>
                    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                </Segment>


            </Popup>

        )
    }
}
