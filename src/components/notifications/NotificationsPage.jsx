import React, { Component } from 'react';
import { Container, List, Header } from "semantic-ui-react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import moment from 'moment';
import { notificationActions } from '../../_actions';


function notificationBuilder(segment) {
    if (segment) {
        switch (segment.type) {
            case "user":
                return <Link to={"/profile/" + segment.data.username}>{segment.data.username}</Link>
            case "project":
                return <Link to={`/projects/` + segment.data.id}>your project</Link>
            default:
                return "Segment bla bla bla"
        }
    }
}


class NotificationsPage extends Component {
    constructor(props) {
        super(props);
        this.props.getNotifications();
    }

    render() {
        const { notifications } = this.props;
        let notificationRender = notifications.map((notification, index) => {
            let relative_time = moment(notification.timestamp).fromNow();
            let actor = notificationBuilder(notification.actor);
            let target = notificationBuilder(notification.target);

            return (
                <List.Item key={index}>
                    <List.Content>
                        <List.Description>
                            {actor} {notification.verb} {target} <br />
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
