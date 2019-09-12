import React, { Component } from 'react';
import { Header, Segment, Divider, Dimmer, Image, Button } from 'semantic-ui-react';

export default class ProfileRegularInfo extends Component {
    state = {
    }
    handleDimmerShow = () => {
        this.setState({ profileDimmerActive: true })
    }
    handleDimmerHide = () => {
        this.setState({ profileDimmerActive: false })
    }


    render() {
        const { profileDimmerActive } = this.state;
        const { own } = this.props;
        console.log(own, "=> bolongssdasd")

        const profileImageDimmerContent = (
            <div>
                <Button primary size="tiny">Change</Button>
            </div>

        );

        return (
            <div>
                <Segment textAlign="center">

                    {own ? <Dimmer.Dimmable
                        as={Image}
                        dimmed={profileDimmerActive}
                        dimmer={{ active: profileDimmerActive, content: profileImageDimmerContent }}
                        onMouseEnter={this.handleDimmerShow}
                        onMouseLeave={this.handleDimmerHide}
                        src='/Logo.png'
                        circular
                        size="small"
                    /> : <Image src="/Logo.png" size="small" circular centered />
                    }

                    <Header
                        as="h3"
                        content="{profilename}"
                        subheader="Tell us about yourself in one line"
                    />

                    <Divider />

                    <div style={{ textAlign: "left" }}>
                        <p>Email: username@gmail.com</p>
                        <p>Member Since: Aug 2019</p>
                    </div>

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
            </div>
        )
    }
}
