import React, { Component } from 'react';

import Page, { Logo } from './Page';
import { Button } from './Button';
import AuthCard from './AuthCard';
import CanvasWorker from './CanvasWorker';

import './css/LandingPage.css';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = { authCardVisible: false };
    this.toggleAuthCard = this.toggleAuthCard.bind(this);

    // Reference to Canvas DOM
    this.canvas = null;
    this.canvasWorker = null;
  }

  componentDidMount() {
    // Component mounted, we can access Canvas here
    this.canvasWorker = new CanvasWorker(this.canvas, this.canvas.parentNode);
    this.canvasWorker.initiate();
  }

  toggleAuthCard(event) {
    this.setState((prevState, props) => {
      return { authCardVisible: !prevState.authCardVisible };
    });
  }

  render() {
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
                using the Intercom coversation app. We simply automate our
                replies based on the received message.
              </span>
            </div>
          </div>
          <div className="content-right">
            <Button className="btn-dashboard" text="Open Dashboard"
                    icons={{ 'idle': 'fa-long-arrow-right' }}
                    onClick={this.toggleAuthCard} />
          </div>
        </div>
        <div className="canvas-wrapper">
          <canvas className="canvas-main" id="canvas-main"
                  ref={(dom) => { this.canvas = dom }} />
        </div>
        {
          this.state.authCardVisible &&
          <AuthCard coverImage='/static/images/login-cover.jpg' onClose={this.toggleAuthCard} />
        }
      </Page>
    )
  }
}

export default LandingPage;
