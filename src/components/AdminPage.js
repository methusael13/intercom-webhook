import React, { Component } from 'react';
import { Redirect } from 'react-router';

import Page, { Logo } from './Page';
import DataTable from './DataTable';
import { Button, SubmitButton } from './Button';

import './css/AdminPage.css';

class UserControl extends Component {
  render() {
    return (
      <div className="user-control-wrapper theme-text-header-idle">
        <span className="control-item user-name theme-text-accent">
          {this.props.user}
        </span>
        <span className="control-item user-action" onClick={this.props.onLogoutTriggered} >
          {this.props.controlText}
        </span>
      </div>
    )
  }
}

class Header extends Component {
  render() {
    return (
      <div className="app-header theme-text-header-normal">
        <div className="app-container">
          <div className="app-panel">
            <Logo title="Intercom Webhook" onClick={this.props.onHomeTriggered} />
            <UserControl user={this.props.username} controlText={this.props.logoutText}
                         onLogoutTriggered={this.props.onLogout} />
          </div>
          <div className="app-screen-panel">
            <span className="text">{this.props.screenTitle}</span>
          </div>
        </div>
      </div>
    )
  }
}

class AdminPage extends Component {
  constructor(props) {
    super(props);

    // Decides if DataTable should clear its data on render
    this.state = {
      clearTable: false, redirectToMain: false,
      logoutText: 'Logout'
    };

    // Bind class methods
    this.triggerTableClear = this.triggerTableClear.bind(this);
    this.triggerDataUpload = this.triggerDataUpload.bind(this);
    this.triggerLogout = this.triggerLogout.bind(this);
    this.triggerHomeRedirect = this.triggerHomeRedirect.bind(this);
  }

  triggerHomeRedirect() {
    this.setState({ redirectToMain: true });
  }

  triggerLogout() {
    this.setState({ logoutText: 'Logging out' });
    // Try logout
    window.auth.logout(
      (success) => {
        this.setState({ redirectToMain: true });
      },
      (error) => {
        window.appLog(error, true);
        // Reset logout text
        this.setState({ logoutText: 'Logout' });
      }
    )
  }

  triggerDataUpload(event) { console.log('Uploading data...'); }

  triggerTableClear(event) { this.setState({ clearTable: true }); }

  componentDidUpdate(prevProps, prevState) {
    // Reset clear state.
    // Makes sure table doesn't clear on next render
    this.setState({ clearTable: false });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Ensure component doesn't enter an update loop
    return (
      this.state.clearTable !== nextState.clearTable ||
      this.state.redirectToMain !== nextState.redirectToMain ||
      this.state.logoutText !== nextState.logoutText
    );
  }

  render() {
    if (this.state.redirectToMain) {
      return (<Redirect to="/" />);
    }

    return (
      <Page className="app-page-admin">
        <Header screenTitle="Dashboard" username={this.props.username}
                logoutText={this.state.logoutText}
                onLogout={this.triggerLogout}
                onHomeTriggered={this.triggerHomeRedirect} />
        <div className="app-content app-container">
          <div className="btn-panel">
            <Button className="btn-clear" text="Clear" onClick={this.triggerTableClear} />
            <SubmitButton onSubmit={this.triggerDataUpload} className="btn-login" state="idle" />
          </div>
          <DataTable clearTable={this.state.clearTable} />
        </div>
      </Page>
    )
  }
}

export default AdminPage;
