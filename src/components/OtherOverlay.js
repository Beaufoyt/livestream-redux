import React from 'react';
import PureComponent from './PureComponent';
import Overlay from './Overlay';

import { OVERLAYS } from 'constants/Overlays';

export default class OtherOverlay extends PureComponent {
  render() {
    const { dispatch } = this.props;

    return (
      <div className="register-overlay">
        <Overlay id={ OVERLAYS.OTHER } dispatch={ dispatch }>This is some other content in the overlay</Overlay>
      </div>
    );
  }
}
