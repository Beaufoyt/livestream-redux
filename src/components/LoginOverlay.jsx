import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { login } from '../actions/auth';
import { showOverlay, hideOverlay } from '../actions/overlays';
import OVERLAYS from '../constants/Overlays';

import PureComponent from './PureComponent';
import Overlay from './Overlay';

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

  getFormDetails() {
    return {
      username: this.state.username,
      password: this.state.password,
    };
  }

  handleLogin = () => {
    this.props.dispatch(login(this.getFormDetails()));
  }

  handleRegisterChange() {
    this.props.dispatch(hideOverlay(OVERLAYS.LOGIN));
    this.props.dispatch(showOverlay(OVERLAYS.REGISTER));
  }

  handleDetailChange(e) {
    const { id, value } = e.target;

    this.setState({
      [id]: value,
    });
  }

  renderRegisterPrompt() {
    return (
      <div className="register-prompt">
        <span>
          No account?
        <button
            disabled={this.props.auth.get('isRequesting')}
            className="btn btn-link"
            onClick={() => this.handleRegisterChange()}>
            Click Here
        </button>
          to register
        </span>
      </div>
    );
  }

  render() {
    const { dispatch } = this.props;
    const error = this.props.auth.get('error');

    const overlayProps = {
      title: 'Login',
      continueText: 'Login',
      isLoading: this.props.auth.get('isRequesting'),
      onContinue: this.handleLogin,
      onCancel: () => dispatch(hideOverlay(OVERLAYS.LOGIN)),
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
          { this.renderRegisterPrompt() }
        </Overlay>
      </div>
    );
  }
}
