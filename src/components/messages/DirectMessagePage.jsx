import React, { Component } from 'react';
import { Container, Header, List, Form, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { messageActions } from "../../_actions";


import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

class DirectMessagePage extends Component {
    constructor(props) {
        super(props);
        const { contactname } = this.props.match.params;
        this.props.getDirectMessages(contactname);
    }

    state = {
        messageContent: "",
    }

    handleChange = (e, { value }) => {
        this.setState({
            messageContent: value,
        });
    }

    handleMessageSubmit = () => {
        const { contactname, } = this.props.match.params;
        const { username } = this.props;
        let message = {
            sender: username,
            recipient: contactname,
            content: this.state.messageContent,
        }
        this.setState({
            messageContent: "",
        });
        this.props.sendDirectMessage(message);
    }


    render() {
        const { directMessages, username } = this.props;
        const { contactname } = this.props.match.params;

        let conversationRender = directMessages.map((message, index) => {
            let contact = message.sender_name === username ? message.recipient_name : message.sender_name;
            let relative_time = moment(message.sent_at).fromNow();
            return (
                <List.Item key={index}>
                    <List.Content floated="right">
                        <i>{relative_time}</i>
                    </List.Content>
                    <Image avatar src={message.sender_avatar || `/Logo.png`} />
                    <List.Content>
                        <List.Description>
                            <b>{message.sender_name === username ? "You: " : message.sender_name + `: `}</b> {message.content}
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
                        <Image />
                        {contactname}
                    </Header>

                    <List relaxed>
                        {conversationRender}
                    </List>

                    <Form onSubmit={this.handleMessageSubmit}>
                        <Form.TextArea placeholder='Type your message...' value={this.state.messageContent} onChange={this.handleChange} />
                        <Form.Button>Send</Form.Button>
                    </Form>

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
        sendDirectMessage: (message) => dispatch(messageActions.sendDirectMessage(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessagePage);
