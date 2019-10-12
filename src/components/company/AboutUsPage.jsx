import React, { Component } from 'react';
import { Container, Header } from "semantic-ui-react";
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

export default class AboutUsPage extends Component {
    render() {
        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <Container style={{ marginTop: "3em", minHeight: "85vh" }} text>
                    <Header as="h2" dividing style={{ paddingTop: "2em", marginBottom: "1em" }}>About Us</Header>
                    We are “Khude Gobeshok”. Our aim is to create a better world through encouraging science maniac young geek. We are here to help the endeavors from different field to get united and work together. Engineers, students, researchers can get ideas about the latest projects around them from our enrich project garage. Khude Gobeshok is a platform where professionals will show off their skill through participating challenges and will encourage others.
                </Container>
            </React.Fragment>
        )
    }
}