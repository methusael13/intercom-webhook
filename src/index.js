import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import Auth from './components/Auth';
import App from './components/App';
import { appLog } from './components/UtilComponents';

import './index.css';

class Root extends Component {
  constructor(props) {
    super(props);

    // Initiate global contructs
    window.auth = new Auth(); window.appLog = appLog;
  }

  render() {
    return (<HashRouter><App /></HashRouter>);
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
