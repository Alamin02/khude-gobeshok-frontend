import React, { Component } from 'react'
import { Header, Container, Pagination, Item, Card, Tab, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import styles from "./SquadsPage.module.css";
import moment from "moment";
import { squadActions } from "../../_actions";

class SquadsPage extends Component {
    constructor(props) {
        super(props);
        this.props.getPeople(1);
    }

    state = {
        activePeoplePage: 1
    }

    handlePageChange = (e, { activePage }) => {
        this.setState({ activePage });
        this.props.getPeople(activePage);
        window.scrollTo(0, 0);
    }

    render() {
        const { people, peopleCount } = this.props;
        let numberOfPages = Math.ceil(peopleCount / 12); // Retrieved Page Size (Number of Projects per page) is 12.

        let peopleList = people.map((person, index) => {
            let imageUrl = `/Logo.png`;
            if (person.profile.avatar) imageUrl = person.profile.avatar.thumbnail;
            let formattedJoinDate = moment(person.date_joined).format("MMM Do YYYY")
            return (
                <Card key={index} href={`/profile/` + person.username} >
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
                        <Card.Group key="people" itemsPerRow={3} stackable >
                            {peopleList}
                        </Card.Group>
                        <Container className={styles.pagination}>
                            <Pagination
                                activePage={this.state.activePage}
                                totalPages={numberOfPages}
                                onPageChange={this.handlePageChange}
                            />
                        </Container>
                    </Tab.Pane>
                ),
            },
            {
                menuItem: 'Join Squad',
                render: () => <Tab.Pane key="join" attached>Functionalily not available yet.</Tab.Pane>,
            },
            {
                menuItem: 'Create Squad',
                render: () => <Tab.Pane key="create" attached>Functionalily not available yet.</Tab.Pane>,
            },
        ]

        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <div className={styles.squadSectionContainer} >
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
    const { people, peopleCount } = state.squad;
    return {
        people,
        peopleCount,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPeople: (pageNumber) => dispatch(squadActions.getPeople(pageNumber)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SquadsPage);
