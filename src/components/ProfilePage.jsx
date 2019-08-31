import React, { Component } from 'react'
import { Container, Grid, Card, Icon, Image } from "semantic-ui-react";

export default class ProfilePage extends Component {
    render() {
        return (
            <div style={{ minHeight: '100vh' }}>
                <Container t style={{ marginTop: '5em' }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Card>
                                    <Image src='https://www.templatebeats.com/files/images/profile_user.jpg' wrapped ui={false} />
                                    <Card.Content textAlign="center">
                                        <Card.Header>Irfan Khan</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>Running under the coffee cloud</span>
                                        </Card.Meta>
                                        <Card.Description>
                                            Matthew is a musician living in Nashville.
                                         </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a>
                                            <Icon name='user' />
                                            22 Friends
                                         </a>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={12}>
                                Something else
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}
