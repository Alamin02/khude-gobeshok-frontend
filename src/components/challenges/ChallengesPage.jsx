import React, { Component } from 'react';
import { Container, Header, Message } from "semantic-ui-react";

import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

import styles from "./ChallengesPage.module.css";

export default class ChallengesPage extends Component {
    render() {
        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <div style={{ minHeight: "85vh" }} >
                    <div className={styles.pageHeaderContainer} >
                        <Header as='h1' textAlign="center" className={styles.pageHeader} icon>
                            <Header.Content>Challenges</Header.Content>
                        </Header>
                    </div>

                    <Container text className={styles.messageContainer}>
                        <Message floating>
                            No Challenges Currently Running, We'll notify you!
                        </Message>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}
