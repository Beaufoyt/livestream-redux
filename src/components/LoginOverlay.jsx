import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { login, clearError } from '../actions/auth';
import { hideOverlay, switchOverlays } from '../actions/overlays';
import OVERLAYS from '../constants/Overlays';

import PureComponent from './PureComponent';
import Overlay from './Overlay';
import RegisterPrompt from './RegisterPrompt';

export default class LoginOverlay extends PureComponent {
  static propTypes = {
    auth: PropTypes.instanceOf(Object).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeys, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeys, false);
  }

  getFormDetails() {
    return {
      username: this.state.username,
      password: this.state.password,
    };
  }

  handleKeys = (event) => {
    if (event.which === 13 || event.keyCode === 13) {
      this.handleLogin();
    }
  }

  handleLogin = () => {
    if (!this.state.username || !this.state.password) {
      this.setState({
        loginError: {
          id: 'noUserPass',
          detail: 'You must enter a username and password',
        },
      });
      return;
    }
    this.setState({ error: null });
    this.props.dispatch(login(this.getFormDetails()));
  }

  handleRegisterChange = () => {
    this.clearAuthError();
    this.props.dispatch(switchOverlays(OVERLAYS.LOGIN, OVERLAYS.REGISTER));
  }

  handleDetailChange(e) {
    const { id, value } = e.target;

    this.clearAuthError();

    this.setState({
      loginError: null,
      [id]: value,
    });
  }

  handleLoginClose = () => {
    this.props.dispatch(hideOverlay(OVERLAYS.LOGIN));
    this.clearAuthError();
  }

  clearAuthError() {
    if (this.props.auth.get('error')) {
      this.props.dispatch(clearError());
    }
  }

  render() {
    const { dispatch } = this.props;
    const error = this.state.loginError || this.props.auth.get('error');

    const overlayProps = {
      title: 'Login',
      continueText: 'Login',
      isLoading: this.props.auth.get('isRequesting'),
      onContinue: this.handleLogin,
      onCancel: this.handleLoginClose,
      error,
    };

    return (
      <div className="login-overlay">
        <Overlay
            {...overlayProps}
            id={OVERLAYS.LOGIN}
            dispatch={dispatch}>
          <FormGroup>
            <ControlLabel className="login-label">Username</ControlLabel>
            <FormControl
                id="username"
                value={this.state.username}
                onChange={e => this.handleDetailChange(e)}
                className="login-field"
                type="text" />
          </FormGroup>
          <FormGroup>
            <ControlLabel className="login-label">Password</ControlLabel>
            <FormControl
                id="password"
                value={this.state.password}
                onChange={e => this.handleDetailChange(e)}
                className="login-field"
                type="password" />
          </FormGroup>
          <RegisterPrompt onClick={this.handleRegisterChange} linkDisabled={this.props.auth.get('isRequesting')} />
        </Overlay>
      </div>
    );
  }
}
