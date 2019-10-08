import React, { Component } from 'react';
import { Container, Header, List } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { messageActions } from "../../_actions";

import moment from "moment";

import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

class MessagesPage extends Component {
    constructor(props) {
        super(props);
        this.props.getConversations();
    }

    render() {
        const { conversations, username } = this.props;
        let conversationRender = conversations.map((message, index) => {
            let contact = message.sender_name === username ? message.recipient_name : message.sender_name;
            let relative_time = moment(message.sent_at).fromNow()

            return (
                <List.Item key={index} as={Link} to={`/messages/` + contact}>
                    <List.Content>
                        <List.Header >{contact}</List.Header>
                        <List.Description>
                            {message.sender_name === username ? "You: " : message.sender_name + `: `} {message.content}
                            <br />
                            <i>{relative_time} </i>
                        </List.Description>
                    </List.Content>
                </List.Item>
            )
        })

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
