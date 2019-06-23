import React from 'react';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginForm from './components/LoginPage';
import SignupForm from './components/SignupPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
      </Router>
      
    </div>
  );
}

export default App;
