import React from 'react';
import { Container, Grid, Image, Header } from 'semantic-ui-react';
import styles from './Description.module.css';

export default function Description() {
    return (
        <div className={styles.sectionContainer}>
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Image src="/img/group-work.png" />
                        </Grid.Column>
                        <Grid.Column width={10} verticalAlign="middle">
                            <Header as="h2">Alone we are strong but together we are stronger. Find your perfect match, team up and stick together to bring your dream project into light here.</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={10} verticalAlign="middle" textAlign="right">
                            <Header as="h2">Alone we are strong but together we are stronger. Find your perfect match, team up and stick together to bring your dream project into light here.</Header>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Image src="/img/project-library.png" />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container>
        </div>
    )
}
