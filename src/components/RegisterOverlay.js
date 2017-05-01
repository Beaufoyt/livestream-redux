import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

import { hideOverlay } from 'actions/numbers';
import { register, clearError } from 'actions/auth';
import { OVERLAYS } from 'constants/Overlays';

import PureComponent from './PureComponent';
import Overlay from './Overlay';

export default class RegisterOverlay extends PureComponent {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  componentWillUnmount() {
    this.props.dispatch(clearError());
  }

  render() {
    const { dispatch } = this.props;
    const error = this.props.auth.get('error');

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
            onContinue={ () => this.props.dispatch(register('hello')) }>
          <FormGroup controlId="formUser">
            <ControlLabel className="register-label">Username</ControlLabel>
            <FormControl className="register-field" type="text"/>
          </FormGroup>

          <FormGroup controlId="formPass">
            <ControlLabel className="register-label">Password</ControlLabel>
            <FormControl className="register-field" type="password"/>
          </FormGroup>

          <FormGroup controlId="formComfirmPass">
            <ControlLabel className="register-label">Confirm Password</ControlLabel>
            <FormControl className="register-field" type="password"/>
          </FormGroup>

          <FormGroup controlId="formEmail">
            <ControlLabel className="register-label">Email</ControlLabel>
            <FormControl className="register-field" type="text"/>
          </FormGroup>

          <Checkbox className="register-tnc">
            I have read and accept the T&C's
          </Checkbox>
        </Overlay>
      </div>
    );
  }
}
