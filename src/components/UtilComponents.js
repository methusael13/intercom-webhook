import React, { Component } from 'react';
import './css/UtilComponents.css';

export const appLog = (msg, error = false) => {
  var dt = (new Date()).toLocaleString();

  if (error) {
    console.error('[ERROR | ' + dt + ']: ' + msg);
  } else {
    console.log('[INFO | ' + dt + ']: ' + msg);
  }
}

export class CloseButton extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      'metawrapper': {
        width: this.props.size,
        height: this.props.size
      }
    }
  }

  render() {
    return (
      <div className="close-wrapper" style={this.styles.metawrapper}
           onClick={this.props.onClick} >
        <div className="close-body"></div>
      </div>
    )
  }
}
