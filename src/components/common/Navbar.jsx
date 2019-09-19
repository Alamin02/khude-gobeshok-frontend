import React from "react";
import { Menu, Container, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: ""
        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });
    handleIconClick = (name) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state;

        return (
            <Menu pointing fixed="top" >
                <Container>
                    <Link to={"/"}>
                        <Menu.Item
                            icon="home"
                            name=""
                            active={activeItem === "home"}
                            onClick={() => this.handleIconClick("home")}
                        />
                    </Link>

                    <Link to={"/projects"}>
                        <Menu.Item
                            name="Project Library"
                            active={activeItem === "Project Library"}
                            onClick={this.handleItemClick}
                        />
                    </Link>

                    <Menu.Menu position="right">
                        {
                            this.props.loggedIn ?
                                <Link to="/new-project">
                                    <Menu.Item
                                        name="Add Project"
                                        active={activeItem === "Add Project"}
                                        onClick={this.handleItemClick}
                                    />
                                </Link> : <Link to="/login">
                                    <Menu.Item
                                        name="Login"
                                        active={activeItem === "Login"}
                                        onClick={this.handleItemClick}
                                    />
                                </Link>
                        }

                        {
                            this.props.loggedIn ?

                                <Dropdown item icon="user" >
                                    <Dropdown.Menu active>
                                        <Link to={"/profile/" + this.props.username}>
                                            <Dropdown.Item text='Your Profile' onClick={() => this.handleIconClick("")} />
                                        </Link>
                                        <Link to="/logout">
                                            <Dropdown.Item text='Logout' onClick={() => this.handleIconClick("")} />
                                        </Link>
                                    </Dropdown.Menu>
                                </Dropdown>
                                : <Link to="/signup">
                                    <Menu.Item
                                        name="Sign Up"
                                        active={activeItem === "Sign Up"}
                                        onClick={this.handleItemClick}
                                    />
                                </Link>
                        }
                    </Menu.Menu>
                </Container>
            </Menu>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    const { username } = state.users;
    return {
        loggedIn,
        username,
    };
}

export default connect(mapStateToProps)(Navbar);
