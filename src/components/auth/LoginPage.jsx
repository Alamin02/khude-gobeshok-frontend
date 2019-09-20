import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment, Label, Input } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { userActions } from '../../_actions';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

import styles from "./LoginPage.module.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  render() {
    const { username, password, submitted } = this.state;
    const { alert, error } = this.props;
    const error_list = [];

    const errors = error && JSON.parse(error, (key, value) => {
      if (typeof value === "string")
        error_list.push(value);
    });

    return (
      <div>
        <ScrollToTopOnMount />
        <Grid textAlign='center' className={styles.container} verticalAlign='middle'>
          <Grid.Column className={styles.loginForm}>
            <Header
              as='h2'
              textAlign='center'
              className={styles.headerStyle}
              content="SignIn to your account"
            />
            {error && <Message error header="Request Errors" content={error_list} />}

            <Form size='large' onSubmit={this.handleSubmit}>

              <Segment raised textAlign="left">
                <Form.Field fluid >
                  <Input
                    icon='user'
                    iconPosition='left'
                    placeholder='Username'
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                    error={submitted && !username} />

                  {submitted && !username &&
                    <Label basic color='red' pointing> Please enter a Username</Label>
                  }
                </Form.Field>

                <Form.Field>
                  <Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'

                    name="password" value={password} onChange={this.handleChange}
                  />
                  {submitted && !password &&
                    <Label basic color='red' pointing> Please enter a password </Label>
                  }
                </Form.Field>

                <Button color='blue' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to="/signup">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loggingIn, error } = state.authentication;
  const { alert } = state;
  return {
    loggingIn,
    alert,
    error
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export default connectedLoginPage;