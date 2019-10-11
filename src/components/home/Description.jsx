import React from 'react';
import { Container, Grid, Image, Header, Responsive } from 'semantic-ui-react';
import styles from './Description.module.css';

const ResponsiveDescription = ({ mobile }) => (
    <div className={styles.sectionContainer}>
        <Container>
            <Grid stackable  >
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Image
                            src="/img/group-work.png"
                            size={mobile && "medium"}
                            centered={mobile && true}
                        />
                    </Grid.Column>
                    <Grid.Column width={10} verticalAlign="middle">
                        <Header
                            as="h2"
                            className={
                                mobile ? styles.infoTextMobile : styles.infoText
                            }
                        >
                            Alone we are strong but together we are stronger. Find your perfect match, team up and stick together to bring your dream project into light here.
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className={styles.reverseColumns}>
                    <Grid.Column width={10} verticalAlign="middle" textAlign="right">
                        <Header
                            as="h2"
                            className={
                                mobile ? styles.infoTextMobile : styles.infoText
                            }
                        >
                            Bring yourself out from conundrum. Explore our enriched library for the latest innovation and find assistance for your project. You can also upload your research here to get comments or review from other researchers.
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Image
                            src="/img/project-library.png"
                            size={mobile && "medium"}
                            centered={mobile && true}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Image
                            src="/img/challenges.png"
                            size={mobile && "medium"}
                            centered={mobile && true}
                        />
                    </Grid.Column>
                    <Grid.Column width={10} verticalAlign="middle">
                        <Header
                            as="h2"
                            className={
                                mobile ? styles.infoTextMobile : styles.infoText
                            }
                        >
                            Present your skills through challenges. Give a ride on quest section, sharpen your skill and make yourself more sagacious everyday than previous.
                        </Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </Container>
    </div>
)

export default function Description() {
    return (
        <React.Fragment>
            <Responsive {...Responsive.onlyMobile}>
                <ResponsiveDescription mobile />
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <ResponsiveDescription />
            </Responsive>
        </React.Fragment>
    )
}
