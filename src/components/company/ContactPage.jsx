import React, { Component } from 'react';
import { Container, Grid, Image, Header, Form } from "semantic-ui-react";
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

export default class ContactPage extends Component {
    state = {
        fullName: "",
        email: "",
        message: "",
    }

    render() {
        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <Container style={{ marginTop: "6em", minHeight: "85vh" }}>
                    <Grid columns={2} relaxed>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h2">
                                    Drop us a line
                                </Header>
                                <Form>
                                    <Form.Input
                                        label="Full Name"
                                        name="fullName"
                                        placeholder="Input your full name"
                                    />
                                    <Form.Input
                                        label="Email Address"
                                        name="email"
                                        placeholder="Input your email address"
                                    />
                                    <Form.TextArea
                                        label='Message'
                                        name="message"
                                        placeholder='Feel free to share anything'
                                    />
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