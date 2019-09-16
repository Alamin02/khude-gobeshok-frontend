import React, { Component } from 'react'
import { Segment, Divider, Container, Image } from 'semantic-ui-react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <Segment vertical style={{ padding: '1.5em 0em' }} inverted>
                    <Container textAlign="center">
                        <Image src='/Logo.png' size='mini' centered />
                        <br />
                        <p>Contact | About Us | Privacy Policy</p>
                        <p>Copyright &copy; Khudegobeshok 2019, All Rights Reserved.</p>
                    </Container>
                </Segment>
            </div>
        )
    }
}
