import React, { PropTypes } from 'react';
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
      usernameValidation: null,
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
      this._getusernameValidationState(),
      this._getpasswordValidationState(),
      this._getconfirmedPasswordValidationState(),
    ];

    if (validationStates.some((el) => { return ['error', null].includes(el); })) {
      const cpv = this._getconfirmedPasswordValidationState() ? this._getconfirmedPasswordValidationState() : 'error';
      this.setState({
        registerError: {
          detail: 'Invalid details',
        },
        usernameValidation: this._getusernameValidationState() ? this._getusernameValidationState() : 'error',
        passwordValidation: this._getpasswordValidationState() ? this._getpasswordValidationState() : 'error',
        confirmedPasswordValidation: cpv,
      });
    } else if (!this.state.tncAccepted) {
      this.setState({
        registerError: {
          detail: 'Please accept the T&C\'s',
        },
      });
    } else {
      this.props.dispatch(register(this._getRegistrationData()));
    }
  }

  _handleDetailChange(e) {
    const { id, value } = e.target;
    const validationFunc = `_get${e.target.id}ValidationState`;

    this.setState({
      [id]: value,
      [id + 'Validation']: this[validationFunc](value),
      registerError: null,
    });
  }

  _getusernameValidationState(username = this.state.username) {
    const length = username.length;
    if (length) {
      if (length > 10) return 'success';
      return 'error';
    }

    return null;
  }

  _getpasswordValidationState(password = this.state.password) {
    const length = password.length;
    if (length) {
      if (length < 6) return 'error';
      return 'success';
    }

    return null;
  }

  _getconfirmedPasswordValidationState(confirmedPassword = this.state.confirmedPassword) {
    if (confirmedPassword) {
      if (this.state.password === confirmedPassword) return 'success';
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
          <FormGroup validationState={ this.state.usernameValidation }>
            <ControlLabel className="register-label">Username</ControlLabel>
            <FormControl
                id="username"
                value={ this.state.username }
                onChange={ (e) => this._handleDetailChange(e) }
                className="register-field"
                type="text"/>
          </FormGroup>

          <FormGroup validationState={ this.state.passwordValidation }>
            <ControlLabel className="register-label">Password</ControlLabel>
            <FormControl
                id="password"
                value={ this.state.password }
                onChange={ (e) => this._handleDetailChange(e) }
                className="register-field"
                type="password"/>
          </FormGroup>

          <FormGroup validationState={ this.state.confirmedPasswordValidation }>
            <ControlLabel className="register-label">Confirm Password</ControlLabel>
            <FormControl
                id="confirmedPassword"
                value={ this.state.confirmedPassword }
                onChange={ (e) => this._handleDetailChange(e) }
                className="register-field"
                type="password"/>
          </FormGroup>

          <FormGroup>
            <ControlLabel className="register-label">Email</ControlLabel>
            <FormControl
                disabled
                id="email"
                value={ this.state.email }
                onChange={ (e) => this._handleDetailChange(e) }
                className="register-field"
                type="email"/>
          </FormGroup>

          <Checkbox className="register-tnc" onChange={e => this._handleTncChange(e)}>
            I have read and accept the T&C's
          </Checkbox>
        </Overlay>
      </div>
    );
  }
}
