import React, { Component } from 'react';
import { Container } from "semantic-ui-react";

import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

export default class ChallengesPage extends Component {
    render() {
        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <Container style={{ minHeight: "85vh" }} >
                    <br /> <br /> <br />
                    Functionality will be available soon...
                </Container>
            </React.Fragment>
        )
    }
}
