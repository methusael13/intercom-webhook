import React, { Component } from 'react';

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
        <span className="control-item user-action">Logout</span>
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
            <Logo title="Intercom Webhook" />
            <UserControl user="John Doe" />
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
    this.state = { clearTable: false };

    // Bind class methods
    this.triggerTableClear = this.triggerTableClear.bind(this);
    this.triggerDataUpload = this.triggerDataUpload.bind(this);
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
    return this.state.clearTable !== nextState.clearTable;
  }

  render() {
    return (
      <Page className="app-page-admin">
        <Header screenTitle="Dashboard" />
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
