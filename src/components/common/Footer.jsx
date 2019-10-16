import React, { Component } from 'react';
import { Segment, Divider, Container, Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";

export default class Footer extends Component {
    render() {
        return (
            <div>
                <Segment vertical style={{ padding: '1.5em 0em' }} inverted>
                    <Container textAlign="center">
                        <Image src='/img/footer-logo.png' size='mini' centered />
                        <br />
                        <p><Link style={{ color: "white" }} to="/contact">Contact</Link> | <Link style={{ color: "white" }} to="/about">About Us</Link> | <Link style={{ color: "white" }} to="/privacy">Privacy Policy</Link></p>
                        <p>Copyright &copy; Khudegobeshok 2019, All Rights Reserved.</p>
                    </Container>
                </Segment>
            </div>
        )
    }
}
