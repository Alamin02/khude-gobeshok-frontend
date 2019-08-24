import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { userActions } from '../_actions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

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
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.username && user.email && user.password1 && user.password2) {
      dispatch(userActions.register(user));
    }
  }

  render() {
    const { username, email, password1, password2, submitted } = this.state.user;
    const { alert } = this.props;
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Create New account
          </Header>
          {alert.message && <p>{alert.message}</p>}
          <Form size='large' onSubmit={this.handleSubmit}>

            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' name="username" value={username} onChange={this.handleChange} />
              <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' name="email" value={email} onChange={this.handleChange} />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name="password1"
                value={password1} onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Confirm Password'
                type='password'
                name="password2"
                value={password2} onChange={this.handleChange}
              />

              <Button color='teal' fluid size='large'>
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
  const { registering } = state.registration;
  const { alert } = state;
  return {
    registering,
    alert
  };
}

export default connect(mapStateToProps)(SignupPage);
