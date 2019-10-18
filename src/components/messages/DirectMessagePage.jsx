import React, { Component } from 'react';
import { Container, Header, List, Form, Image, Message, Button, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { messageActions } from "../../_actions";
import { paginationConstants } from "../../_constants";

import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

class DirectMessagePage extends Component {
    constructor(props) {
        super(props);
        const { contactname } = this.props.match.params;
        this.props.getDirectMessages(contactname, 1);
    }

    state = {
        messageContent: "",
        activePage: 1,
    }

    handleChange = (e, { value }) => {
        this.setState({
            messageContent: value,
        });
    }

    handleMessageSubmit = () => {
        const { contactname, } = this.props.match.params;
        const { username, } = this.props;

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

    handleLoadMore = () => {
        const { contactname } = this.props.match.params;
        let { activePage } = this.state;
        this.props.getDirectMessages(contactname, activePage + 1);
        this.setState({ activePage: activePage + 1 });
    }

    render() {
        const { directMessages, directMessagesCount, username } = this.props;
        const { contactname } = this.props.match.params;
        let numberOfPages = Math.ceil(directMessagesCount / paginationConstants.MESSAGES_PER_PAGE);

        console.log(numberOfPages);

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
                        {contactname}
                    </Header>
                    <Segment style={{ overflow: "auto", maxHeight: "50vh" }} >
                        {(numberOfPages <= this.state.activePage) ?
                            <Message size='mini'>End of messages.</Message>
                            :
                            <Button fluid onClick={this.handleLoadMore}>LOAD MORE</Button>
                        }

                        <List relaxed>
                            {conversationRender.reverse()}
                        </List>
                    </Segment>
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
    const { directMessages, directMessagesCount } = state.message;
    const { username } = state.users;
    return {
        directMessages,
        directMessagesCount,
        username,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDirectMessages: (username, pageNumber) => dispatch(messageActions.getDirectMessages(username, pageNumber)),
        sendDirectMessage: (message) => dispatch(messageActions.sendDirectMessage(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessagePage);
