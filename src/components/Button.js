import React, { Component } from 'react';
import './css/Button.css';

export class ActionButton extends Component {
  constructor(props) {
    super(props);

    /* Set action properties */
    this.actionStyles = this.props.actionStyle || {
      'idle': 'act-btn-idle', 'processing': 'act-btn-proc',
      'success': 'act-btn-success', 'error': 'act-btn-error'
    };

    /* Bind class methods */
    this.handleAction = this.handleAction.bind(this);

    this.getIcon = this.getIcon.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  getStyle() { return this.actionStyles[this.props.actionState] || ''; }
  getIcon() { return this.props.actionIcons[this.props.actionState] || ''; }
  getValue() { return this.props.actionValues[this.props.actionState] || ''; }

  /* Must be overridden by child classes to define behaviour */
  handleAction(event) {
    this.props.action && this.props.action(event);
  }

  render() {
    const extBtnKlass = this.props.btnClass || '';

    return (
      <button className={ "action-btn action-btn-ext " + extBtnKlass + " " + this.getStyle() }
              onClick={ this.handleAction }>
        <span className="text">{ this.getValue() }</span>
        {
          this.props.actionIcons && (
            <span className="icon">
              <i className={ "fa " + this.getIcon() } aria-hidden="true"></i>
            </span>
          )
        }
      </button>
    )
  }
}

export class SubmitButton extends Component {
  constructor(props) {
    super(props);

    // Initiate properties
    this.icons = this.props.icons || {
      'idle': 'fa-long-arrow-right', 'processing': 'fa-spin fa-spinner',
      'success': 'fa-check', 'error': 'fa-close'
    };

    this.values = this.props.values || {
      'idle': 'Submit', 'processing': 'Submitting',
      'success': 'Success', 'error': 'Error'
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // Allow submit only if status is idle
    if (this.props.state === 'idle')
      this.props.onSubmit(event);
  }

  render() {
    return (
      <ActionButton actionIcons={this.icons} actionValues={this.values}
                    actionState={this.props.state} btnClass={this.props.className}
                    action={this.handleSubmit} />
    )
  }
}

export class Button extends ActionButton {
  constructor(props) {
    super(props);
    
    this.values = { 'idle': this.props.text };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) { this.props.onClick(event); }

  render() {
    return (
      <ActionButton actionValues={this.values} actionState='idle'
                    btnClass={this.props.className} action={this.handleClick}
                    actionIcons={this.props.icons || null} />
    )
  }
}
