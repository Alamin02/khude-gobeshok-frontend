import React from "react";
import { Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "home"
        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        return (
            <Menu pointing fixed={"top"} >
                <Container>
                    <Link to={"/"}>
                        <Menu.Item
                            icon="home"
                            name=""
                            active={activeItem === ""}
                            onClick={this.handleItemClick}
                        />
                    </Link>

                    <Link to={"/projects"}>
                        <Menu.Item
                            name="Projects"
                            active={activeItem === "Projects"}
                            onClick={this.handleItemClick}
                        />
                    </Link>

                    <Menu.Menu position="right">
                        <Link to="/login">
                            <Menu.Item
                                name="Login"
                                active={activeItem === "Login"}
                                onClick={this.handleItemClick}
                            />
                        </Link>
                        <Link to="/signup">
                            <Menu.Item
                                name="Sign Up"
                                active={activeItem === "Sign Up"}
                                onClick={this.handleItemClick}
                            />
                        </Link>
                    </Menu.Menu>
                </Container>
            </Menu>
        );
    }
}

export default Navbar;