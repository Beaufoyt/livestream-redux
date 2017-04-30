import React, { PropTypes } from 'react';

import { hideOverlay } from 'actions/numbers';

import PureComponent from './PureComponent';
import OverlayContent from './OverlayContent';

export default class Overlay extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  }

  render() {
    const { dispatch, id } = this.props;

    return (
      <div className="overlay">
        <button className="btn btn-danger overlay-close" onClick={() => dispatch(hideOverlay(id))}>
          Close Overlay
        </button>
        <OverlayContent>{ this.props.children }</OverlayContent>
      </div>
    );
  }
}
