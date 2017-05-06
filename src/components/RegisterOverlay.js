import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

import { hideOverlay } from 'actions/numbers';
import { register, clearError } from 'actions/auth';
import { OVERLAYS } from 'constants/Overlays';

import PureComponent from './PureComponent';
import Overlay from './Overlay';

export default class RegisterOverlay extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tncAccepted: false,
      registerError: null,
      username: '',
      password: '',
      confirmedPassword: '',
      email: '',
      emailValidation: null,
      usernameValidation: {
        status: null,
        detail: null,
      },
      passwordValidation: null,
      confirmedPasswordValidation: null,
    };
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  componentWillUnmount() {
    this.props.dispatch(clearError());
  }

  _handleTncChange(e) {
    this.props.dispatch(clearError());
    this.setState({
      tncAccepted: e.target.checked,
      registerError: null,
    });
  }

  _handleRegisterContinue() {
    const validationStates = [
      this._getUsernameValidationState().status,
      this._getPasswordValidationState(),
      this._getConfirmedPasswordValidationState(),
    ];

    if (validationStates.some((el) => { return ['error', null].includes(el); })) {
      const uvStatus = this._getUsernameValidationState().status;
      const uv = uvStatus ? this._getUsernameValidationState() : this._getUserObject('error', 'short');
      const pv = this._getPasswordValidationState() ? this._getPasswordValidationState() : 'error';
      const cpv = this._getConfirmedPasswordValidationState() ? this._getConfirmedPasswordValidationState() : 'error';

      this.setState({
        registerError: {
          detail: 'Invalid details',
        },
        usernameValidation: uv,
        passwordValidation: pv,
        confirmedPasswordValidation: cpv,
      });
    } else if (!this.state.tncAccepted) {
      this.setState({
        registerError: {
          id: 'tnc',
          detail: 'Please accept the T&C\'s',
        },
      });
    } else {
      this.props.dispatch(register(this._getRegistrationData()));
    }
  }

  _handleDetailChange(e) {
    const { id, value } = e.target;
    const validationFunc = `_get${id.charAt(0).toUpperCase() + id.slice(1)}ValidationState`;

    this.setState({
      [id]: value,
      [id + 'Validation']: this[validationFunc](value),
      registerError: null,
    });
  }

  _getUserObject(status, detail) {
    return {
      status,
      detail,
    };
  }

  _getUsernameValidationState(username = this.state.username) {
    const userNameRegex = /^[a-zA-Z0-9\_]+$/;
    const length = username.length;

    if (length) {
      if (!username.match(userNameRegex)) return this._getUserObject('error', 'char');
      else if (length < 8) return this._getUserObject('error', 'short');
      else if (length > 16) return this._getUserObject('error', 'long');
      return this._getUserObject('success', null);
    }

    return this._getUserObject(null, null);
  }

  _getPasswordValidationState(password = this.state.password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[\s\S]{8,}$/;
    const length = password.length;

    if (length) {
      if (password.match(passwordRegex)) return 'success';
      return 'error';
    }

    return null;
  }

  _getConfirmedPasswordValidationState(confirmedPassword = this.state.confirmedPassword) {
    if (confirmedPassword) {
      if (this.state.password === confirmedPassword) return 'success';
      return 'error';
    }

    return null;
  }

  _getEmailValidationState(email = this.state.email) {
    const emailRegex = /.+@.+/;

    if (email) {
      if (email.match(emailRegex)) return 'success';
      return 'error';
    }

    return null;
  }

  _getRegistrationData() {
    return {
      username: this.state.username,
      password: this.state.password,
      tncAccepted: this.state.tncAccepted,
    };
  }

  _getValidationIcon(validationState) {
    if (!validationState) {
      return null;
    }

    if (validationState === 'error') {
      return <i className="fa fa-times error" aria-hidden="true" />;
    }

    return <i className="fa fa-check success" aria-hidden="true" />;
  }

  _getValidationIconHolder(validationState) {
    return (
      <div className="validation-icon">
        { this._getValidationIcon(validationState) }
      </div>
    );
  }

  _getValidationInfoContainer(validationMessage, detail) {
    const infoClass = detail ? 'validation-info expanded' : 'validation-info';

    return <div className={ infoClass }><div>{ validationMessage }</div>{ detail }</div>;
  }

  _getUsernameValidationInfo() {
    let validationMessage;

    if (this.state.usernameValidation.detail === 'char') {
      validationMessage = 'No special characters allowed, except Underscores (_)';
    }

    if (this.state.usernameValidation.detail === 'short') {
      validationMessage = 'Your username must be at least 8 characters in length';
    }

    if (this.state.usernameValidation.detail === 'long') {
      validationMessage = 'Your username cannot be longer than 16 characters';
    }

    return this._getValidationInfoContainer(validationMessage);
  }

  _getPasswordValidationDetail() {
    return (
      <ul>
        <li>
          1 Uppercase character
        </li>
        <li>
          1 Lowercase character
        </li>
        <li>
          1 Number
        </li>
        <li>
          1 Special character ($@$!%*#?&)
        </li>
      </ul>
    );
  }

  _getPasswordValidationInfo() {
    if (this.state.passwordValidation === 'error') {
      const validationMessage = 'Your password must be at least 8 characters long and contain at least:';
      return this._getValidationInfoContainer(validationMessage, this._getPasswordValidationDetail());
    }

    return this._getValidationInfoContainer(null);
  }

  _getConfirmedPasswordValidationInfo() {
    const validationMessage = (this.state.confirmedPasswordValidation === 'error') ? 'Your passwords must match' : null;
    return this._getValidationInfoContainer(validationMessage);
  }

  _getEmailValidationInfo() {
    const validationMessage = (this.state.emailValidation === 'error') ? 'Please enter a valid email address' : null;
    return this._getValidationInfoContainer(validationMessage);
  }

  _getTncClassName() {
    return classnames('register-tnc', {
      success: this.state.tncAccepted,
      error: (this.state.registerError && this.state.registerError.id === 'tnc'),
    });
  }

  render() {
    const { dispatch } = this.props;
    const error = this.state.registerError || this.props.auth.get('error');

    const overlayProps = {
      id: OVERLAYS.REGISTER,
      title: 'Register',
      isLoading: this.props.auth.get('isRequesting'),
      continueText: 'Register',
      cancelText: 'Cancel',
      error,
      dispatch,
    };

    return (
      <div className="register-overlay">
        <Overlay
            {...overlayProps}
            onCancel={ () => dispatch(hideOverlay(OVERLAYS.REGISTER)) }
            onContinue={ () => this._handleRegisterContinue() }>
          <FormGroup validationState={ this.state.usernameValidation.status }>
            <ControlLabel className="register-label">Username</ControlLabel>
            { this._getValidationIconHolder(this.state.usernameValidation.status) }
            <FormControl
                id="username"
                value={ this.state.username }
                onChange={ (e) => this._handleDetailChange(e) }
                className="register-field"
                type="text"/>
            { this._getUsernameValidationInfo() }
          </FormGroup>

          <FormGroup controlId="password" validationState={ this.state.passwordValidation }>
            <ControlLabel className="register-label">Password</ControlLabel>
            { this._getValidationIconHolder(this.state.passwordValidation) }
            <FormControl
                value={ this.state.password }
                onChange={ (e) => this._handleDetailChange(e) }
                className="register-field"
                type="password"/>
            { this._getPasswordValidationInfo() }
          </FormGroup>

          <FormGroup validationState={ this.state.confirmedPasswordValidation }>
            <ControlLabel className="register-label">Confirm Password</ControlLabel>
            { this._getValidationIconHolder(this.state.confirmedPasswordValidation) }
            <FormControl
                id="confirmedPassword"
                value={ this.state.confirmedPassword }
                onChange={ (e) => this._handleDetailChange(e) }
                className="register-field"
                type="password"/>
            { this._getConfirmedPasswordValidationInfo() }
          </FormGroup>

          <FormGroup validationState={ this.state.emailValidation }>
            <ControlLabel className="register-label">Email</ControlLabel>
            { this._getValidationIconHolder(this.state.emailValidation) }
            <FormControl
                disabled
                id="email"
                value={ this.state.email }
                onChange={ (e) => this._handleDetailChange(e) }
                className="register-field"
                type="email"/>
            { this._getEmailValidationInfo() }
          </FormGroup>

          <Checkbox className={ this._getTncClassName() } onChange={e => this._handleTncChange(e)}>
            I have read and accept the T&C's
          </Checkbox>
        </Overlay>
      </div>
    );
  }
}
