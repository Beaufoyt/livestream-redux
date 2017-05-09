import React from 'react';
import PropTypes from 'prop-types';

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

  getFormDetails() {
    return {
      hello: 'heyman',
    };
  }

  handleLogin = () => {
    this.props.dispatch(login(this.getFormDetails()));
  }

  handleRegisterChange() {
    this.props.dispatch(hideOverlay(OVERLAYS.LOGIN));
    this.props.dispatch(showOverlay(OVERLAYS.REGISTER));
  }

  renderRegisterPrompt() {
    if (this.props.auth.get('isRequesting')) {
      return null;
    }

    return (
      <div className="register-prompt">
        <span>
          No account?
        <button className="btn btn-link" onClick={() => this.handleRegisterChange()}>Click Here</button>
          to register
        </span>
      </div>
    );
  }

  render() {
    const { dispatch } = this.props;

    const overlayProps = {
      title: 'Login',
      continueText: 'Login',
      isLoading: this.props.auth.get('isRequesting'),
      onContinue: this.handleLogin,
    };

    return (
      <div className="login-overlay">
        <Overlay
            {...overlayProps}
            id={OVERLAYS.LOGIN}
            dispatch={dispatch}>
            Hello man this is some placeholder content
          { this.renderRegisterPrompt() }
        </Overlay>
      </div>
    );
  }
}
