import React, { Component } from 'react';
import './css/Button.css';

export class ActionButton extends Component {
  constructor(props) {
    super(props);

    this.actionStates = {
      'IDLE': 0, 'PROCESSING': 1, 'SUCCESS': 2, 'ERROR': 3
    };

    this.state = { action: this.actionStates.IDLE };
    this.actionStyles = {
      0: 'act-btn-idle', 1: 'act-btn-proc', 2: 'act-btn-success',
      3: 'act-btn-error'
    };

    /* Bind class methods */
    this.initActionProps = this.initActionProps.bind(this);
    this.handleAction = this.handleAction.bind(this);

    this.getIcon = this.getIcon.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  /* Must be called at least once before the first render */
  initActionProps(values, icons) {
    this.actionValues = values && {
      0: values.idle || '', 1: values.processing || '',
      2: values.success || '', 3: values.error || ''
    };

    this.actionIcons = icons && {
      0: icons.idle || '', 1: icons.processing || '',
      2: icons.success || '', 3: icons.error || ''
    };
  }

  getIcon() { return this.actionIcons[this.state.action] || ''; }
  getStyle() { return this.actionStyles[this.state.action] || ''; }
  getValue() { return this.actionValues[this.state.action] || ''; }

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
          this.actionIcons && (
            <span className="icon">
              <i className={ "fa " + this.getIcon() } aria-hidden="true"></i>
            </span>
          )
        }
      </button>
    )
  }
}

export class SubmitButton extends ActionButton {
  constructor(props) {
    super(props);

    // Initiate properties
    const icons = {
      'idle': 'fa-long-arrow-right', 'processing': 'fa-spin fa-spinner',
      'success': 'fa-check', 'error': 'fa-close'
    };

    const values = {
      'idle': 'Submit', 'processing': 'Submitting',
      'success': 'Success', 'error': 'Error'
    }

    this.initActionProps(values, icons);
  }

  handleAction(event) {
    this.setState((prevState, props) => {
      let newAction;
      if (prevState.action === this.actionStates.IDLE)
        newAction = this.actionStates.PROCESSING;
      else if (prevState.action === this.actionStates.PROCESSING)
        newAction = this.actionStates.SUCCESS;
      else if (prevState.action === this.actionStates.SUCCESS)
        newAction = this.actionStates.ERROR;
      else
        newAction = this.actionStates.IDLE;

      return { action: newAction };
    });
  }
}

export class Button extends ActionButton {
  constructor(props) {
    super(props);
    this.initActionProps({ 'idle': this.props.text }, null);
  }
}
