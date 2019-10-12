import React, { Component } from 'react';
import { Container, Header } from "semantic-ui-react";
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

export default class PrivacyPolicyPage extends Component {
    render() {
        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <Container style={{ marginTop: "3em", minHeight: "85vh" }} text>
                    <Header as="h2" dividing style={{ paddingTop: "2em", marginBottom: "1em" }}>Privacy Policy</Header>
                </Container>
            </React.Fragment>
        )
    }
}