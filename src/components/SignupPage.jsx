import React from 'react'
import { Button, Form, Grid, Header, Message, Segment, Label, Input } from 'semantic-ui-react'
import { userActions } from '../_actions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import styles from "./SignupPage.module.css"

class SignupPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        email: '',
        password1: '',
        password2: '',
        submitted: false
      },
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        submitted: true,
      }
    });
    if (user.username && user.email && user.password1 && user.password2 && (user.password1 === user.password2)) {
      this.props.submit(user);
    }
  }

  render() {
    const { username, email, password1, password2, submitted } = this.state.user;
    const { alert, error } = this.props;

    const error_list = [];

    const errors = error && JSON.parse(error, (key, value) => {
      if (typeof value === "string")
        error_list.push(value);
    });

    return (
      <Grid textAlign='center' className={styles.container} verticalAlign='middle'>
        <Grid.Column className={styles.signupForm}>
          <Header as='h2' textAlign='center' className={styles.headerStyle} >
            Create new account
          </Header>
          {error && <Message error header="Request Errors" list={error_list} />}
          <Form size='large' onSubmit={this.handleSubmit}>

            <Segment raised textAlign="left">
              <Form.Field>
                <Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                />
                {!username && submitted && <Label basic color='red' pointing> Please enter a Username </Label>}
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  icon='mail'
                  iconPosition='left'
                  placeholder='E-mail address'
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
                {!email && submitted && <Label basic color='red' pointing> Please enter an email </Label>}
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name="password1"
                  value={password1} onChange={this.handleChange}
                />
                {!password1 && submitted && <Label basic color='red' pointing> Please enter a password </Label>}
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Confirm Password'
                  type='password'
                  name="password2"
                  value={password2} onChange={this.handleChange}
                />
                {password1 && (password1 !== password2) && submitted && <Label basic color='red' pointing> Passwords didn't match </Label>}
              </Form.Field>
              <Button color='blue' fluid size='large'>
                Signup
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to='/login'>Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }

}

function mapStateToProps(state) {
  const { registering, error } = state.registration;
  const { alert, } = state;
  return {
    registering,
    alert,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submit: (user) => dispatch(userActions.register(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
