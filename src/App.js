import React from 'react';
import Navbar from './components/common/Navbar'
import { BrowserRouter as Router, Route, Redirect, } from "react-router-dom";
import { connect } from 'react-redux';

import LoginForm from './components/auth/LoginPage';
import SignupForm from './components/auth/SignupPage';
import HomePage from './components/home/HomePage';
import ProjectsPage from './components/projects/ProjectLibraryPage';
import ProjectEditor from "./components/editor/ProjectEditorPage";
import ProjectView from "./components/projects/ProjectViewerPage";
import ProfilePage from "./components/profile/ProfilePage";
import Footer from "./components/common/Footer";
import ChallengesPage from "./components/challenges/ChallengesPage";
import SquadsPage from "./components/squads/SquadsPage";
import MessagesPage from "./components/messages/MessagesPage";
import DirectMessagePage from "./components/messages/DirectMessagePage";
import NotificationPage from "./components/notifications/NotificationsPage";
import ContactPage from "./components/company/ContactPage";
import AboutUsPage from "./components/company/AboutUsPage";
import PrivacyPage from "./components/company/PrivacyPolicyPage";

import "./App.css";
import { userActions, editorActions } from './_actions';
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar >
            <SemanticToastContainer />
            <Route path="/" exact component={HomePage} />
            <Route path="/projects" exact component={ProjectsPage} />
            <Route path="/new-project" component={ProjectEditor} />
            <Route path="/projects/:id/" component={ProjectView} />
            <Route path="/profile/:profilename/" component={ProfilePage} />
            <Route path="/challenges/" component={ChallengesPage} />
            <Route path="/squads/" component={SquadsPage} />
            <Route path="/messages/" exact component={MessagesPage} />
            <Route path="/messages/:contactname" component={DirectMessagePage} />
            <Route path="/notifications/" component={NotificationPage} />
            <Route path="/about/" component={AboutUsPage} />
            <Route path="/contact/" component={ContactPage} />
            <Route path="/privacy/" component={PrivacyPage} />

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
          </Navbar>
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
    logout: () => { dispatch(userActions.logout()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
