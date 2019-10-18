import React, { Component } from 'react';
import { Container, Header, List, Image, Pagination, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { messageActions } from "../../_actions";
import moment from "moment";

import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import NewMessageModal from "./NewMessageModal";

class MessagesPage extends Component {
    constructor(props) {
        super(props);
        this.props.getConversations(1);
    }

    state = {
        activePage: 1,
        messageModalOpen: false,
    }

    openMessageModal = () => {
        this.setState({ messageModalOpen: true });
    }

    onMessageModalClose = () => {
        this.setState({ messageModalOpen: false });
    }

    handlePageChange = (e, { activePage }) => {
        this.setState({ activePage });
        this.props.getConversations(activePage);
        window.scrollTo(0, 0);
    }

    render() {
        const { conversations, conversationCount, username } = this.props;
        let numberOfPages = Math.ceil(conversationCount / 12);

        let conversationRender = conversations.map((message, index) => {
            let contact = message.sender_name === username ? message.recipient_name : message.sender_name;
            let relative_time = moment(message.sent_at).fromNow();
            let avatar = message.sender_name === username ? message.recipient_avatar : message.sender_avatar;

            return (
                <List.Item key={index} as={Link} to={`/messages/` + contact}>
                    <Image avatar src={avatar || `/Logo.png`} />
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
                        <Header.Content style={{ width: "100%" }}>
                            Conversations
                            <span style={{ float: "right" }}>
                                <Button onClick={this.openMessageModal}> <Icon name='envelope' /> NEW</Button>
                            </span>
                        </Header.Content>
                    </Header>

                    <NewMessageModal open={this.state.messageModalOpen} onClose={this.onMessageModalClose} />

                    <List relaxed animated>
                        {(conversationRender.length === 0) ? <p>No conversations yet..</p> : conversationRender}
                    </List>

                    <Container style={{ paddingTop: "3em" }} textAlign="center">
                        <Pagination
                            defaultActivePage={1}
                            firstItem={null}
                            lastItem={null}
                            pointing
                            secondary
                            totalPages={numberOfPages}
                            onPageChange={this.handlePageChange}
                        />
                    </Container>

                </Container>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { conversations, conversationCount } = state.message;
    const { username } = state.users;
    return {
        conversations,
        conversationCount,
        username,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getConversations: (pageNumber) => dispatch(messageActions.getConversations(pageNumber)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
