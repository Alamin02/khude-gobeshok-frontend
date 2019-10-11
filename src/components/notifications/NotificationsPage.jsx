import React, { Component } from 'react';
import { Container } from "semantic-ui-react";
import { connect } from 'react-redux';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

import { notificationActions } from '../../_actions';

class NotificationsPage extends Component {
    constructor(props) {
        super(props);
        this.props.getNotifications();
    }

    render() {
        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <Container style={{ minHeight: "85vh" }} >
                    <br /> <br /> <br />
                    Functionality will be available soon...
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
