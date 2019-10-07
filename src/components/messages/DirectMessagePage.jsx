import React, { Component } from 'react';
import { Container, Header, List } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { messageActions } from "../../_actions";

import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

class DirectMessagePage extends Component {
    constructor(props) {
        super(props);
        const { contactname } = this.props.match.params;
        this.props.getDirectMessages(contactname);
    }

    render() {
        const { directMessages, username } = this.props;
        const { contactname } = this.props.match.params;

        let conversationRender = directMessages.map((message, index) => {
            let contact = message.sender_name === username ? message.recipient_name : message.sender_name
            return (
                <List.Item key={index}>
                    <List.Content>
                        <List.Description>
                            <b>{message.sender_name === username ? "You: " : message.sender_name + `: `}</b> {message.content}
                            <br />
                            <i>{message.sent_at}</i>
                        </List.Description>
                    </List.Content>
                </List.Item>
            )
        });

        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <Container style={{ minHeight: "85vh" }} text>
                    <br /> <br /> <br />
                    <Header as="h2" dividing>
                        {contactname}
                    </Header>

                    <List relaxed>
                        {conversationRender}
                    </List>
                </Container>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { directMessages } = state.message;
    const { username } = state.users;
    return {
        directMessages,
        username
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDirectMessages: (username) => dispatch(messageActions.getDirectMessages(username)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessagePage);
