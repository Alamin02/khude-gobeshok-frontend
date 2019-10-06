import React, { Component } from 'react';
import { Container, Header, List } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { messageActions } from "../../_actions";

import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

class MessagesPage extends Component {
    constructor(props) {
        super(props);
        this.props.getConversations();
    }

    render() {
        const { conversations, username } = this.props;
        let conversationRender = conversations.map((message, index) => (
            <List.Item key={index} as={Link} to="/messages">
                <List.Content>
                    <List.Header >{message.sender_name === username ? message.recipient_name : message.sender_name}</List.Header>
                    <List.Description>
                        {message.sender_name === username ? "You: " : message.sender_name + `: `} {message.content}
                        <br />
                        {message.sent_at}
                    </List.Description>
                </List.Content>
            </List.Item>
        ))

        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <Container style={{ minHeight: "85vh" }} text>
                    <br /> <br /> <br />
                    <Header as="h2" dividing>
                        Conversations
                    </Header>

                    <List relaxed animated>
                        {conversationRender}
                    </List>
                </Container>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { conversations } = state.message;
    const { username } = state.users;
    return {
        conversations,
        username
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getConversations: () => dispatch(messageActions.getConversations()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
