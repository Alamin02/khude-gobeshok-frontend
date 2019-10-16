import React, { Component } from 'react';
import { Container, List, Header } from "semantic-ui-react";
import { connect } from 'react-redux';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import moment from 'moment';
import { notificationActions } from '../../_actions';

class NotificationsPage extends Component {
    constructor(props) {
        super(props);
        this.props.getNotifications();
    }

    render() {
        const { notifications } = this.props;
        let notificationRender = notifications.map((notification, index) => {
            let relative_time = moment(notification.timestamp).fromNow()

            return (
                <List.Item key={index}>
                    <List.Content>
                        <List.Description>
                            {notification.actor} {notification.verb} <br />
                            <i>{relative_time} </i>
                        </List.Description>
                    </List.Content>
                </List.Item>
            )
        })

        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <Container style={{ minHeight: "85vh" }} text >
                    <br /> <br /> <br />
                    <Header as="h2" dividing>
                        Notifications
                    </Header>

                    <List relaxed animated>
                        {(notificationRender.length === 0) ? <p>No notifications</p> : notificationRender}
                    </List>
                </Container>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { notifications } = state.notification;
    return {
        notifications,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getNotifications: () => dispatch(notificationActions.getNotifications()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPage);
