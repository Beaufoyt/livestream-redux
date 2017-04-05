import React, { PropTypes } from 'react';
import { hideOverlay } from 'actions/numbers';
import PureComponent from './PureComponent';
import OverlayContent from './OverlayContent';

export default class RegisterOverlay extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  getButtonClassNames() {
    return 'btn btn-danger register-overlay-close';
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className="register-overlay">
        <button className={ this.getButtonClassNames() } onClick={() => dispatch(hideOverlay('registerOverlay'))}>
          Close Overlay
        </button>
        <OverlayContent>This is some content in the overlay</OverlayContent>
      </div>
    );
  }
}
