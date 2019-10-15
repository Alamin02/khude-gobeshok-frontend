import React, { Component } from 'react'
import { Header, Container, Grid, Image, Item, Card, Tab, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import styles from "./SquadsPage.module.css";
import moment from "moment";
import { squadActions } from "../../_actions";

class SquadsPage extends Component {
    constructor(props) {
        super(props);
        this.props.getPeople();
    }
    render() {
        const { people } = this.props;

        let peopleList = people.map((person) => {
            let imageUrl = `/Logo.png`;
            if (person.profile.avatar) imageUrl = person.profile.avatar.thumbnail;
            let formattedJoinDate = moment(person.date_joined).format("MMM Do YYYY")
            return (
                <Card key={person.username} href={`/profile/` + person.username} >
                    <Card.Content>
                        <Item.Group>
                            <Item>
                                <Item.Image src={imageUrl} size="tiny" />
                                <Item.Content>
                                    <Item.Header>{person.username}</Item.Header>
                                    <Item.Meta>
                                        Joined on {formattedJoinDate}
                                    </Item.Meta>
                                    <Item.Description>
                                        <Icon name="map marker alternate" /> {person.profile.address || "Not provided"} <br />
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Card.Content>
                </Card>
            )
        });

        const panes = [
            {
                menuItem: 'Find Member',
                render: () => (
                    <Tab.Pane attached>
                        <Card.Group itemsPerRow={3} stackable >
                            {peopleList}
                        </Card.Group>
                    </Tab.Pane>
                ),
            },
            {
                menuItem: 'Join Squad',
                render: () => <Tab.Pane attached>Functionalily not available yet.</Tab.Pane>,
            },
            {
                menuItem: 'Create Squad',
                render: () => <Tab.Pane attached>Functionalily not available yet.</Tab.Pane>,
            },
        ]

        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <div style={{ minHeight: "85vh" }} >
                    <div className={styles.pageHeaderContainer} >
                        <Header as='h1' textAlign="center" className={styles.pageHeader} icon>
                            <Header.Content>Make Squad</Header.Content>
                        </Header>
                    </div>

                    <Container className={styles.peopleListContainer}>
                        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                    </Container>
                </div>
            </React.Fragment >
        )
    }
}

function mapStateToProps(state) {
    const { people } = state.squad;
    return {
        people,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPeople: () => dispatch(squadActions.getPeople()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SquadsPage);
