import React, { Component } from 'react';
import { Segment, Divider, Container, Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";

export default class Footer extends Component {
    render() {
        return (
            <div>
                <Segment vertical style={{ padding: '1.5em 0em' }} inverted>
                    <Container textAlign="center">
                        <Image src='/Logo.png' size='mini' centered />
                        <br />
                        <p><Link to="/contact">Contact</Link> | <Link to="/about">About Us</Link> | <Link to="/privacy">Privacy Policy</Link></p>
                        <p>Copyright &copy; Khudegobeshok 2019, All Rights Reserved.</p>
                    </Container>
                </Segment>
            </div>
        )
    }
}
