import React, { PropTypes } from 'react';
import { hideRegisterOverlay } from 'actions/todos';
import PureComponent from './PureComponent';
import OverlayContent from './OverlayContent';

export default class RegisterOverlay extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className="register-overlay">
        <button className="btn btn-danger register-overlay-close" onClick={() => dispatch(hideRegisterOverlay())}>Close Overlay</button>
        <OverlayContent>This is some content in the overlay</OverlayContent>
      </div>
    );
  }
}
