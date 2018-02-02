import React, { Component } from 'react';
import { Redirect } from 'react-router';

import Page from './Page';
import { Button } from './Button';
import AuthCard from './AuthCard';
import CanvasWorker from './CanvasWorker';

import './css/LandingPage.css';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    
    // Bind functions to this
    this.toggleAuthCard = this.toggleAuthCard.bind(this);
    this.triggerDashboard = this.triggerDashboard.bind(this);
    this.onAuthSubmitSuccess = this.onAuthSubmitSuccess.bind(this);

    this.state = { authCardVisible: false, redirectToDashboard: false };

    // Reference to Canvas DOM
    this.canvas = null;
    this.canvasWorker = null;
  }

  componentDidMount() {
    // Component mounted, we can access Canvas here
    this.canvasWorker = new CanvasWorker(this.canvas, this.canvas.parentNode);
    this.canvasWorker.initiate();
  }

  onAuthSubmitSuccess() {
    // Unnecessary, but still
    this.toggleAuthCard(false);
    // Try redirect
    this.triggerDashboard(null);
  }

  triggerDashboard(event) {
    // Open Auth card if user isn't looged in
    if (!window.auth.isLoggedIn())
      this.toggleAuthCard(true);
    else {
      // Else, Redirect to dashboard
      this.setState({ redirectToDashboard: true });
    }
  }

  componentWillUnmount() {
    // Cleanup canvas worker processes
    this.canvasWorker && this.canvasWorker.dispose();
  }

  toggleAuthCard(visible) { this.setState({ authCardVisible: visible }); }

  render() {
    if (this.state.redirectToDashboard) { return (<Redirect to="/dashboard" />); }

    return (
      <Page className="app-page-user">
        <div className="app-content app-container">
          <div className="content-left">
            <div className="page-title theme-text-header-normal">
              <span className="text">Intercom Webhook</span>
            </div>
            <div className="page-subtitle">
              <div className="icon"></div>
              <span className="text-left">Hasura&nbsp;</span>
              <span className="text-right">|&nbsp;&nbsp;&nbsp;Team - T11NE1</span>
            </div>
            <div className="page-desc">
              <span className="text">
                Webhook allows our app to receive notifications, such as
                conversation replies and users being created in real-time
                using the Intercom conversation app. We simply automate our
                replies based on the received message.
              </span>
            </div>
          </div>
          <div className="content-right">
            <Button className="btn-dashboard" text="Open Dashboard"
                    icons={{ 'idle': 'fa-long-arrow-right' }}
                    onClick={this.triggerDashboard} />
          </div>
        </div>
        <div className="canvas-wrapper">
          <canvas className="canvas-main" id="canvas-main"
                  ref={(dom) => { this.canvas = dom }} />
        </div>
        {
          this.state.authCardVisible &&
          <AuthCard coverImage='/static/images/login-cover.jpg'
                    onClose={(event) => { this.toggleAuthCard(false); }}
                    onSubmitSuccess={this.onAuthSubmitSuccess} />
        }
      </Page>
    )
  }
}

export default LandingPage;
