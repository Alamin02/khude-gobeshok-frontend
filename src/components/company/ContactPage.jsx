import React, { Component } from 'react';
import { Container } from "semantic-ui-react";
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

export default class ContactPage extends Component {
    render() {
        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <Container style={{ marginTop: "3em", minHeight: "85vh" }}>
                    Contact
                </Container>
            </React.Fragment>
        )
    }
}