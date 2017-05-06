import React from 'react';
import PropTypes from 'prop-types';

import Overlay from './Overlay';

import OVERLAYS from '../constants/Overlays';

export default function OtherOverlay({ dispatch }) {
  return (
    <div className="register-overlay">
      <Overlay id={OVERLAYS.OTHER} dispatch={dispatch}>This is some other content in the overlay</Overlay>
    </div>
  );
}

OtherOverlay.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
