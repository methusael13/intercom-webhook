import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import AdminPage from './AdminPage';
import LandingPage from './LandingPage';
import './css/App.css';

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/dashboard' render={(props) => {
          // Protected route, check if user is logged in
          if (window.auth.isLoggedIn())
            return (<AdminPage username={window.auth.getUsername()} />);
          else {
            // Redirect to main page
            return (<Redirect to="/" />);
          }
        }} />
        // Default route, in case path doesn't match
        <Route exact path='*' render={(props) => {
          return (<Redirect to="/" />);
        }} />
      </Switch>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    // Initiate Intercom app
    window.Intercom('boot', { app_id: 'wemz4eos' });
  }

  render() {
    return (
      <div className="app">
        <AppRouter />
      </div>
    )
  }
}

export default App;
