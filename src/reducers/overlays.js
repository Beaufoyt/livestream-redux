import * as types from 'constants/ActionTypes';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import { OVERLAYS } from 'constants/Overlays';

function getOverlaysFromConfig() {
  const base = { overlays: {} };

  for (const overlay in OVERLAYS) {
    if (Object.prototype.hasOwnProperty.call(OVERLAYS, overlay)) {
      base.overlays[OVERLAYS[overlay]] = { isVisible: false };
    }
    if ({}.hasOwnProperty.call(OVERLAYS, overlay)) {
      base.overlays[OVERLAYS[overlay]] = { isVisible: false };
    }
  }

  return base;
}

const input = getOverlaysFromConfig();

const list = fromJS(input);

function overlays(state = list, action) {
  switch (action.type) {
    case types.SHOW_OVERLAY:
      return state.setIn(['overlays', action.id, 'isVisible'], true);

    case types.HIDE_OVERLAY:
      return state.setIn(['overlays', action.id, 'isVisible'], false);

    default:
      return state;
  }
}

export default combineReducers({
  overlays,
});
