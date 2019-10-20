import React, { Component } from 'react';
import { Container, Grid, Image, Header, Form, Button, Message } from "semantic-ui-react";
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import { contactServices } from "../../_services";
import { toast } from "react-semantic-toasts";

export default class ContactPage extends Component {
    state = {
        fullName: "",
        email: "",
        message: "",
        errors: "",
        validationError: "",
    }

    handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        let { fullName, email, message } = this.state;

        if (fullName && email && message) {

            let formattedMessage = {
                full_name: fullName,
                email: email,
                message: message,
            }

            contactServices.sendMessage(formattedMessage)
                .then(
                    success => handleSuccess(success),
                    error => handleError(error),
                )
        }
        else {
            this.setState({
                validationError: "Don't leave empty fields!"
            })
        }

        const handleError = (error) => this.setState({ errors: error });
        const handleSuccess = () => {
            this.setState({
                fullName: "",
                email: "",
                message: "",
                errors: "",
                validationError: "",
            });

            toast({
                type: 'success',
                icon: 'paper plane outline',
                title: 'Message sent',
                size: 'small',
                description: 'Thanks for reaching out!',
                animation: 'bounce',
                time: 5000,
                onDismiss: () => { }
            });
        }
    }

    render() {
        const { errors, validationError } = this.state;
        const error_list = [];

        if (errors) {
            JSON.parse(errors, (key, value) => {
                if (typeof value === "string")
                    error_list.push(value);
            });
        }

        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <Container style={{ marginTop: "6em", minHeight: "85vh" }}>
                    <Grid columns={2} relaxed stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h2">
                                    Drop us a line
                                </Header>
                                {errors && <Message error header="Request Errors" content={error_list} />}
                                {validationError && <Message error header="Request Errors" content={validationError} />}
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Input
                                        label="Full Name"
                                        name="fullName"
                                        value={this.state.fullName}
                                        placeholder="Input your full name"
                                        onChange={this.handleChange}
                                    />
                                    <Form.Input
                                        label="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        placeholder="Input your email address"
                                    />
                                    <Form.TextArea
                                        label='Message'
                                        name="message"
                                        value={this.state.message}
                                        onChange={this.handleChange}
                                        placeholder='Feel free to share anything'
                                    />
                                    <Button color="black" >SEND</Button>
                                </Form>
                                <Header as="h2">
                                    How to find us
                                </Header>
                                <p>
                                    Mirpur-1, Baghdad Shopping Complex <br />
                                    Level-6, Dhaka-1216
                                </p>
                            </Grid.Column>
                            <Grid.Column>
                                <Image fluid src="/img/contact.jpg" />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }
}