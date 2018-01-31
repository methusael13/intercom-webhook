import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import './index.css';

class Root extends Component {
  render() {
    return (<HashRouter><App /></HashRouter>);
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
