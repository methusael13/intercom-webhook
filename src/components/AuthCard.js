import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import { SubmitButton } from './Button';
import { CloseButton, MessageBox } from './UtilComponents';

import './css/AuthCard.css';

/* Input types */
class TextField extends Component {
  render() {
    return (
      <div className="input-wrapper">
        <span className="icon">
          <i className={ "fa " + this.props.icon } aria-hidden="true"></i>
        </span>
        <input type="text" className={this.props.className}
               name={this.props.name} placeholder={this.props.placeholder}
               value={this.props.value}
               onChange={this.props.onTextChange} required />
        {
          this.props.error &&
          <span className="error-text">{this.props.error}</span>
        }
      </div>
    )
  }
}

class PasswordField extends Component {
  constructor(props) {
    super(props);

    this.state = { passwordVisible: false };
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }

  togglePasswordVisibility(event) {
    this.setState((prevState, props) => {
      return { passwordVisible: !prevState.passwordVisible };
    });
  }

  render() {
    const inp_type = this.state.passwordVisible ? "text" : "password";
    const vis_icon = this.state.passwordVisible ? "fa-eye-slash" : "fa-eye";

    return (
      <div className="input-wrapper">
        <span className="icon">
          <i className="fa fa-lock" aria-hidden="true"></i>
        </span>
        <input type={inp_type} className={this.props.className}
               name={this.props.name} placeholder={this.props.placeholder}
               value={this.props.value}
               onChange={this.props.onTextChange} required />
        <span className="view-icon" onClick={this.togglePasswordVisibility} >
          <i className={ "fa " + vis_icon } aria-hidden="true"></i>
        </span>
        {
          this.props.error &&
          <span className="error-text">{this.props.error}</span>
        }
      </div>
    )
  }
}

class AuthCard extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      backgroundImage: 'url(' + this.props.coverImage + ')'
    }
    this.state = {
      username: '', password: '', errors: {},
      buttonState: 'idle', animEntry: true
    };

    // Login button state texts
    this.loginTexts = {
      'idle': 'Login now', 'processing': 'Logging in',
      'success': 'Redirecting', 'error': 'Error'
    };

    // Reference to the Form DOM
    this.form = null;

    // Animation style definitions
    this.animProps = {
      'card': {
        'entry': {
          'start': { opacity: 0, top: 60 },
          'end': { opacity: spring(1), top: spring(50) }
        },
        'exit': {
          'start': { opacity: 1, top: 50 },
          'end': { opacity: spring(0), top: spring(60) }
        }
      },
      'modal': {
        'entry': { 'start': { opacity: 0 }, 'end': { opacity: spring(1) } },
        'exit': { 'start': { opacity: 1 }, 'end': { opacity: spring(0) } }
      }
    };

    // Bind methods to this
    this.triggerLogin = this.triggerLogin.bind(this);
    this.triggerClose = this.triggerClose.bind(this);
    this.getValidationErrors = this.getValidationErrors.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);

    // Register for submit events
    window.captureEvents(Event.SUBMIT);
    // Prevent default handling of submit
    window.onsubmit = () => { return false; }
  }

  getValidationErrors() {
    // Error info
    let error = {};
  
    // Check if username violates any validation rules
    if (this.state.username.length === 0)
      error.username = 'Username cannot be empty';

    // Check if password violates any validation rules
    if (this.state.password.length === 0)
      error.password = 'Password cannot be empty';
    else if (this.state.password.length < 6)
      error.password = 'Password must be greater than 5 characters';

    return error;
  }

  handleTextChange(event) {
    // Get current state
    let _errors = this.state.errors;
    // If {_errors} is valid, reset the error value for
    // currently active textfield
    if (_errors) { _errors[event.target.name] = null; }
    // Reset submit error
    _errors.submitError = null;

    this.setState({
      [event.target.name]: event.target.value, errors: _errors
    });
  }

  handleAnimationEnd() {
    // Only need to handle animations if we're exiting
    if (this.state.animEntry === false) {
      // We're done animating exit, call exit function
      this.props.onClose && this.props.onClose();
    }
  }

  triggerLogin(event) {
    // Prevent default handling of submit
    event.preventDefault();

    let _errors = this.getValidationErrors();

    if (Object.keys(_errors).length !== 0) {
      // Errors exist, data invalid
      this.setState({ errors: { ..._errors } });
    } else {
      const { username, password } = this.state;

      // Return if user is already logged in
      if (window.auth.isLoggedIn()) return;

      // Indicate login process on button
      this.setState({ buttonState: 'processing' });

      // Perform login
      window.auth.login(
        username, password,
        (data) => {
          // Successfully logged in
          this.setState({ buttonState: 'success' });
          // Pause a second and trigger a submit callback
          setTimeout((props) => {
            props.onSubmitSuccess && props.onSubmitSuccess();
          }, 1000, this.props);
        },
        (error) => {
          // Error while logging in
          let error_msg = 'Network error';
          this.setState({ buttonState: 'idle' });

          if (error === window.auth.INVALID_CREDENTIALS)
            error_msg = 'Invalid credentials';
          
          // Set the error
          this.setState((prevState, props) => {
            return { errors: { ...prevState.errors, submitError: error_msg } };
          });
        }
      )
    }

    return false;
  }

  triggerClose(event) {
    // Trigger exit animation
    this.setState({ animEntry: false });
  }

  render() {
    // Test for validation errors
    const { errors, animEntry } = this.state;

    // Card component
    const cardComponent = (interpolatedStyle) => {
      return (
        <div className="auth-card auth-card-position"
             style={{ opacity: interpolatedStyle.opacity, top: interpolatedStyle.top + "%" }}>
          <div className="auth-card-adv" style={this.styles}>
            <div className="auth-card-adv-container">
              <div className="disclaimer">
                Developer Dashboard
              </div>
              <div className="disclaimer-info">
                Dashboard allows you to create reply hints for the Intercom
                app to better interact with the end-user.
              </div>
            </div>
          </div>
          <div className="auth-card-form-section">
            <CloseButton size="1rem" onClick={this.triggerClose} />
            <form className="auth-login-form" ref={(dom) => { this.form = dom; }} >
              <div className="form-title">Sign in to Dashboard</div>
              {
                errors.submitError &&
                <MessageBox message={errors.submitError} className="submit-error" type="error" />
              }
              <TextField className="input-username" icon="fa-user" name="username"
                         placeholder="Username" value={this.state.username}
                         onTextChange={this.handleTextChange}
                         error={ errors.username } />
              <PasswordField className="input-password" name="password"
                             placeholder="Password" value={this.state.password}
                             onTextChange={this.handleTextChange}
                             error={ errors.password } />
              <SubmitButton onSubmit={this.triggerLogin} values={this.loginTexts}
                            className="btn-login" state={this.state.buttonState} />
            </form>
          </div>
        </div>
      );
    };

    // Define entry and exit interpolation values
    const cAnim = this.animProps.card[animEntry ? 'entry' : 'exit'];
    const mAnim = this.animProps.modal[animEntry ? 'entry' : 'exit'];

    return (
      <div className="modal-window">
        <div className="modal-window-container">
          {/* The animated background panel */}
          <Motion defaultStyle={mAnim.start} style={mAnim.end}>
          {
            interpStyle => (
              <div className="modal-window-panel" style={{ opacity: interpStyle.opacity }}
                   onClick={(event) => { event.preventDefault(); this.triggerClose(event); }}></div>
            )
          }
          </Motion>

          {/* The animated card component */}
          <Motion defaultStyle={cAnim.start} style={cAnim.end} onRest={this.handleAnimationEnd}>
          { interpStyle => cardComponent(interpStyle) }
          </Motion>
        </div>
      </div>
    )
  }
}

export default AuthCard;
