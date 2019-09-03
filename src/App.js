import React from 'react';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import LoginForm from './components/LoginPage';
import SignupForm from './components/SignupPage';
import HomePage from './components/HomePage';
import ProjectsPage from './components/ProjectsPage';
import ProjectEditor from "./components/ProjectEditor";
import ProjectView from "./components/ProjectViewer";
import ProfilePage from "./components/ProfilePage";
import Footer from "./components/Footer";

import "./App.css";
import { userActions, editorActions } from './_actions';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.initEditor();
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <SemanticToastContainer />
          <Route path="/" exact component={HomePage} />
          <Route path="/projects" exact component={ProjectsPage} />
          <Route path="/new-project" component={ProjectEditor} />
          <Route path="/projects/:id/" component={ProjectView} />
          <Route path="/profile/:profilename/" component={ProfilePage} />
          <Route path="/login" render={() => (
            this.props.loggedIn ? (
              <Redirect to="/" />
            ) : (
                <LoginForm />
              )
          )} />
          <Route path="/signup" render={() => (
            this.props.loggedIn ? (
              <Redirect to="/" />
            ) : (
                <SignupForm />
              )
          )} />
          <Route path="/logout" render={() => {
            this.props.logout();
            return (<Redirect to="/" />)
          }} />
          <Footer />
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  return {
    loggedIn
  };
}
function mapDispatchToProps(dispatch) {
  return {
    initEditor: () => { dispatch(editorActions.init()) },
    logout: () => { dispatch(userActions.logout()) },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
