import React, { Component } from 'react';
import { Container, List, Header, Button, Message } from "semantic-ui-react";
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
        this.props.getNotifications(1);
    }

    state = {
        activePage: 1
    }

    handleLoadMore = () => {
        let { activePage } = this.state;
        this.props.getNotifications(activePage + 1);

        this.setState({ activePage: activePage + 1 });
    }

    render() {
        const { notifications, notificationCount } = this.props;

        let numberOfPages = Math.ceil(notificationCount / 12);

        let notificationRender = notifications.map((notification, index) => {
            let relative_time = moment(notification.timestamp).fromNow();
            let actor = notificationBuilder(notification.actor);
            let target = notificationBuilder(notification.target);

            return (
                <List.Item key={index}>
                    <List.Content>
                        <List.Description>
                            {actor} {notification.verb} {target}. <br />
                            <i>{relative_time} </i>
                        </List.Description>
                    </List.Content>
                </List.Item>
            )
        });

        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <Container style={{ minHeight: "85vh", marginBottom: "2em" }} text >
                    <br /> <br /> <br />
                    <Header as="h2" dividing>
                        Notifications
                    </Header>

                    <List relaxed animated>
                        {(notificationRender.length === 0) ? <p>No notifications</p> : notificationRender}
                    </List>

                    {(numberOfPages <= this.state.activePage) ? <Message size='mini'>End of notifications.</Message> : <Button fluid onClick={this.handleLoadMore}>LOAD MORE</Button>}
                </Container>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { notifications, notificationCount } = state.notification;
    return {
        notifications,
        notificationCount,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getNotifications: (pageNumber) => dispatch(notificationActions.getNotifications(pageNumber)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPage);
