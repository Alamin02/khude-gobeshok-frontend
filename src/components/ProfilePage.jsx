import React, { Component } from 'react'
import { Container, Grid, Card, Icon, Image, Menu, Segment, Header, Divider } from "semantic-ui-react";

export default class ProfilePage extends Component {
    state = { activeItem: 'projects' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        return (
            <div style={{ minHeight: '100vh' }}>
                <Container t style={{ marginTop: '5em' }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Segment textAlign="center">
                                    <Image src="https://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg" size="small" circular centered />
                                    <Header as="h3" content="irfankhan69" subheader="Tell us about yourself in one line"></Header>
                                    <Divider />
                                    <p>From: Bangladesh</p>
                                    <p>Member Since: Aug 2019</p>
                                    <Divider />
                                </Segment>

                                <Segment>
                                    <Header as="h3" dividing content="Your Badges" />
                                    <p>No badges yet</p>

                                </Segment>

                                <Segment>
                                    <Header as="h3" dividing content="Specialized in" />
                                    <p>No specialties added</p>
                                    <Header as="h3" dividing content="Software Skills" />
                                    <p>No skills added</p>
                                </Segment>

                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Menu pointing secondary>
                                    <Menu.Item
                                        name='projects'
                                        active={activeItem === 'projects'}
                                        onClick={this.handleItemClick}
                                    />
                                    <Menu.Item
                                        name='profile'
                                        active={activeItem === 'profile'}
                                        onClick={this.handleItemClick}
                                    />
                                    <Menu.Item
                                        name='teammates'
                                        active={activeItem === 'teammates'}
                                        onClick={this.handleItemClick}
                                    />
                                </Menu>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}
