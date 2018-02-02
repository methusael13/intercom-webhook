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

export class MessageBox extends Component {
  constructor(props) {
    super(props);

    // Object to map type and style classes
    this.styleMap = {
      'info': 'type-info', 'error': 'type-error',
      'warning': 'type-warning'
    };
  }

  render() {
    const { message, type } = this.props;
    let klass = "msg-box " + this.styleMap[type];

    // Prepend custom class if available
    if (this.props.className)
      klass = this.props.className + " " + klass;

    return (
      <div className={klass}><span>{message}</span></div>
    )
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
