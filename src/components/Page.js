import React, { Component } from 'react';
import './css/Page.css';

export class Logo extends Component {
  render() {
    return (
      <div className="logo-wrapper">
        <span className="icon theme-text-accent">
          <i className="fa fa-code" aria-hidden="true"></i>
        </span>
        <span className="title">{this.props.title}</span>
      </div>
    )
  }
}

class Page extends Component {
  render() {
    let klass = "app-page";
    if (this.props.className) klass += " " + this.props.className;

    return (
      <div className={klass}>{this.props.children}</div>
    )
  }
}

export default Page;
