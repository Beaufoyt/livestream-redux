import React from 'react';
import PureComponent from './PureComponent';

export default class OverlayContent extends PureComponent {
  render() {
    return (
      <div className="overlay-content">
        { this.props.children }
      </div>
    );
  }
}
