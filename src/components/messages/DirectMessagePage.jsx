import React, { Component } from 'react';
import { Container, Header, List, Form, Image, Message, Button, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import moment from "moment";
import { messageActions } from "../../_actions";
import { paginationConstants } from "../../_constants";

import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

class DirectMessagePage extends Component {
    constructor(props) {
        super(props);
        const { contactname } = this.props.match.params;
        this.props.getDirectMessages(contactname, 1);

        this.messageEndRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.directMessages[0] !== prevProps.directMessages[0]) {
            this.messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
        }
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

    scrollToEnd = () => {
        this.messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
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


        let conversationRender = directMessages.map((message, index) => {
            let relative_time = moment(message.sent_at).fromNow();
            return (
                <List.Item key={index}>
                    <Image avatar src={message.sender_avatar || `/Logo.png`} />
                    <List.Content>
                        <List.Header>
                            {message.sender_name === username ? "You: " : message.sender_name + `: `}
                        </List.Header>
                        <List.Description>
                            {message.content} <br />
                            <i>{relative_time}</i>
                        </List.Description>
                    </List.Content>

                </List.Item>
            )
        });

        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <Container style={{ minHeight: "90vh" }} text>
                    <br /> <br /> <br />
                    <Header as="h2" dividing>
                        {contactname}
                    </Header>
                    <Segment style={{ overflow: "auto", height: "50vh", }} >
                        {(numberOfPages <= this.state.activePage) ?
                            <Message size='mini'>No earlier messages beyond this point.</Message>
                            :
                            <Button fluid onClick={this.handleLoadMore}>LOAD MORE</Button>
                        }

                        <List relaxed>
                            {conversationRender.reverse()}
                        </List>

                        <div ref={this.messageEndRef}> </div>
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
