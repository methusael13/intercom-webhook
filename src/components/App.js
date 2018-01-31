import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminPage from './AdminPage';
import LandingPage from './LandingPage';
import './css/App.css';

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/dashboard' component={AdminPage} />
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
