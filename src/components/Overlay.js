import React, { PropTypes } from 'react';

import { hideOverlay } from 'actions/numbers';

import PureComponent from './PureComponent';
import OverlayContent from './OverlayContent';

const bodyClasses = document.body.className;

export default class Overlay extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  }

  componentDidMount() {
    document.body.className = bodyClasses + ' no-scroll';
  }

  componentWillUnmount() {
    document.body.className = bodyClasses;
  }

  render() {
    const { dispatch, id } = this.props;

    return (
      <div className="overlay">
        <button className="btn btn-danger overlay-close" onClick={() => dispatch(hideOverlay(id))}>
          Close
        </button>
        <OverlayContent>{ this.props.children }</OverlayContent>
      </div>
    );
  }
}
