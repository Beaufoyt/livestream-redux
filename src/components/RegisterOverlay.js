import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { hideOverlay } from 'actions/numbers';
import { OVERLAYS } from 'constants/Overlays';

import PureComponent from './PureComponent';
import Overlay from './Overlay';

export default class RegisterOverlay extends PureComponent {
  render() {
    const { dispatch } = this.props;

    return (
      <div className="register-overlay">
        <Overlay id={ OVERLAYS.REGISTER } dispatch={ dispatch }>
          <h3 className="register-overlay-title">Register</h3>
          <p className="register-description">Enter your details</p>
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
            <FormControl disabled className="register-field" type="password"/>
          </FormGroup>

          <FormGroup controlId="formEmail">
            <ControlLabel className="register-label">Email</ControlLabel>
            <FormControl className="register-field" type="text"/>
          </FormGroup>

          <Button
              className="cancel-button"
              type="button"
              onClick={() => dispatch(hideOverlay(OVERLAYS.REGISTER)) }>
              Cancel
          </Button>
          <Button className="register-button" bsStyle="success" type="button">Register</Button>
        </Overlay>
      </div>
    );
  }
}
