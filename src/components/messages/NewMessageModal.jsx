import React, { Component } from 'react';
import { Modal, Form, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";

import { messageActions } from "../../_actions";

class NewMessageModal extends Component {
    state = {
        recipient: "",
        content: "",
        fieldEmptyError: "",
    }

    handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value,
        });
    }

    handleSubmit = () => {
        const { recipient, content } = this.state;
        let message = {
            sender: this.props.username,
            recipient: recipient,
            content: content
        }

        if (recipient && message) {
            this.props.sendDirectMessage(message);
            this.setState({
                recipient: "",
                content: "",
                fieldEmptyError: "",
            });
            this.props.onClose();
        } else {
            this.setState({ fieldEmptyError: "No empty field allowed." })
        }
    }

    render() {
        const { open, onClose } = this.props;
        return (
            <React.Fragment>
                <Modal
                    open={open}
                    onClose={onClose}
                    size='small'
                >
                    <Modal.Header>New Conversation</Modal.Header>
                    <Modal.Content>
                        {this.state.fieldEmptyError && <Message>{this.state.fieldEmptyError}</Message>}
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Recipient's username</label>
                                <Form.Input onChange={this.handleChange} value={this.state.recipient} name="recipient" />
                            </Form.Field>
                            <Form.Field>
                                <label>
                                    Message
                                </label>
                                <Form.TextArea onChange={this.handleChange} value={this.state.content} name="content" />
                            </Form.Field>
                            <Button>SEND</Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    let { username } = state.users;
    return {
        username,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendDirectMessage: (message) => dispatch(messageActions.sendDirectMessage(message))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageModal);
