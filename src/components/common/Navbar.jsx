import React from "react";
import { Menu, Container, Dropdown, Sidebar, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const rightItems = [
    { icon: "", name: "Project Garage", link: "/projects", key: "projects" },
    { icon: "", name: "Challenges", link: "/challenges", key: "challenges" },
    { icon: "", name: "Make Squad", link: "/squads", key: "squads" },
]

const NavBarMobile = ({ leftItems, visible, onPusherClick }) => (
    <Sidebar.Pushable>
        <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            items={leftItems}
            vertical
            visible={visible}
        />

        <Sidebar.Pusher
            dimmed={visible}
            onClick={onPusherClick}
            style={{ minHeight: "100vh" }}
        >

        </Sidebar.Pusher>
    </Sidebar.Pushable>
);


// TODO: Try NavLink over Link
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
            <Menu fixed="top" >
                <Container>
                    <Menu.Item
                        icon="home"
                        as={Link}
                        to="/"
                    />
                    {rightItems.map((item) => (
                        <Menu.Item
                            key={item.key}
                            name={item.name}
                            as={Link}
                            to={item.link}
                        />
                    ))}

                    <Menu.Menu position="right">
                        {
                            this.props.loggedIn ?
                                <React.Fragment>

                                    <Menu.Item
                                        name="Add Project"
                                        active={activeItem === "Add Project"}
                                        onClick={this.handleItemClick}
                                        as={Link}
                                        to="/new-project"
                                    />

                                    <Menu.Item
                                        icon='bell'
                                        active={activeItem === "notification"}
                                        onClick={() => this.handleIconClick("notification")}
                                        as={Link}
                                        to="/notifications"
                                    />

                                    <Menu.Item
                                        icon='envelope'
                                        active={activeItem === "message"}
                                        onClick={() => this.handleIconClick("message")}
                                        as={Link}
                                        to="/messages"
                                    />
                                    <Dropdown item icon="user" pointing="top right">
                                        <Dropdown.Menu active >
                                            <Dropdown.Item text='Your Profile' as={Link} to={`/profile/` + this.props.username} />
                                            <Dropdown.Item text='Logout' to='/logout' />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Menu.Item
                                        name="Login"
                                        active={activeItem === "Login"}
                                        onClick={this.handleItemClick}
                                        as={Link}
                                        to="/login"
                                    />
                                    <Menu.Item
                                        name="Sign Up"
                                        active={activeItem === "Sign Up"}
                                        onClick={this.handleItemClick}
                                        as={Link}
                                        to="/signup"
                                    />
                                </React.Fragment>
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

