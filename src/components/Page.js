import React, { Component } from 'react';
import './css/Page.css';

class Page extends Component {
  render() {
    return (
      <div className="app-page">
        {this.props.children}
      </div>
    )
  }
}

export default Page;
