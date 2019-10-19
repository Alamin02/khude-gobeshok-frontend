import React from "react";
import { Menu, Container, Dropdown, Sidebar, Responsive, Label, Icon, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const leftItems = [
    { icon: "", name: "Project Garage", link: "/projects", key: "projects" },
    { icon: "", name: "Challenges", link: "/challenges", key: "challenges" },
    { icon: "", name: "Make Squad", link: "/squads", key: "squads" },
]

const NavBarMobile = ({
    visible,
    onPusherClick,
    children,
    onToggle,
    loggedIn,
    username,
}) => (
        <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted
                vertical
                visible={visible}
            >
                <Menu.Item as={Link} icon="home" to="/" />

                {leftItems.map((item) => (
                    <Menu.Item
                        key={item.key}
                        name={item.name}
                        as={Link}
                        to={item.link}
                    />
                ))}

                {loggedIn ?
                    <React.Fragment>
                        <Menu.Item
                            name="Add Project"
                            as={Link}
                            to="/new-project"
                        />
                        <Menu.Item
                            name="Notifications"
                            as={Link}
                            to="/notifications"
                        />
                        <Menu.Item
                            name="messages"
                            as={Link}
                            to="/messages"
                        />
                        <Menu.Item
                            name="Profile"
                            as={Link}
                            to={`/profile/` + username}
                        />
                        <Menu.Item
                            name="Logout"
                            as={Link}
                            to="/logout"
                        />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Menu.Item
                            name="Login"
                            as={Link}
                            to="/login"
                        />
                        <Menu.Item
                            name="Sign Up"
                            as={Link}
                            to="/signup"
                        />
                    </React.Fragment>
                }
            </Sidebar>

            <Sidebar.Pusher
                dimmed={visible}
                onClick={onPusherClick}
                style={{ minHeight: "100vh" }}
            >
                <Menu fixed="top">
                    <Menu.Item
                        icon="home"
                        as={Link}
                        to="/"
                    />
                    <Menu.Item
                        position="right"
                        icon="sidebar"
                        onClick={onToggle}
                    />
                </Menu>

                {children}

            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );

const NavBarDesktop = ({ loggedIn, username }) => (

    <Menu fixed="top" >
        <Label corner="left" size="tiny" color="red">
            <Popup
                trigger={<Icon name='bug' />}
                size="mini"
                content='BETA'
                position='bottom left'
            />
        </Label>
        <Container>
            <Menu.Item
                icon="home"
                as={Link}
                to="/"
            >
                <Icon name="home" />
            </Menu.Item>

            {leftItems.map((item) => (
                <Menu.Item
                    key={item.key}
                    name={item.name}
                    as={Link}
                    to={item.link}
                />
            ))}

            <Menu.Menu position="right">
                {
                    loggedIn ?
                        <React.Fragment>
                            <Menu.Item
                                name="Add Project"
                                as={Link}
                                to="/new-project"
                            />
                            <Menu.Item
                                icon='bell'
                                as={Link}
                                to="/notifications"
                            />
                            <Menu.Item
                                icon='envelope'
                                as={Link}
                                to="/messages"
                            />
                            <Dropdown item icon="user" pointing="top right">
                                <Dropdown.Menu active >
                                    <Dropdown.Item text='Your Profile' as={Link} to={`/profile/` + username} />
                                    <Dropdown.Item text='Logout' as={Link} to='/logout' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Menu.Item
                                name="Login"
                                as={Link}
                                to="/login"
                            />
                            <Menu.Item
                                name="Sign Up"
                                as={Link}
                                to="/signup"
                            />
                        </React.Fragment>
                }
            </Menu.Menu>
        </Container>
    </Menu>
)

const NavBarChildren = ({ children }) => (
    <React.Fragment>{children}</React.Fragment>
)

class Navbar extends React.Component {
    state = {
        sideBarVisible: false,
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    handleIconClick = (name) => this.setState({ activeItem: name })
    toggleSideBar = () => this.setState({ sideBarVisible: !this.state.sideBarVisible })
    handlePusher = () => {
        const { sideBarVisible } = this.state;
        if (sideBarVisible)
            this.setState({ sideBarVisible: false })
    }

    render() {
        const { sideBarVisible } = this.state;
        const { children } = this.props;
        return (
            <React.Fragment>
                <Responsive {...Responsive.onlyMobile}>
                    <NavBarMobile
                        visible={sideBarVisible}
                        onToggle={this.toggleSideBar}
                        onPusherClick={this.handlePusher}
                        loggedIn={this.props.loggedIn}
                        username={this.props.username}
                    >
                        <NavBarChildren>{children}</NavBarChildren>
                    </NavBarMobile>
                </Responsive>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <NavBarDesktop loggedIn={this.props.loggedIn} username={this.props.username} />
                    <NavBarChildren>{children}</NavBarChildren>
                </Responsive>
            </React.Fragment>
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

