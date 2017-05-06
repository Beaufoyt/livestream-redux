import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import * as types from '../constants/ActionTypes';

import OVERLAYS from '../constants/Overlays';

function getOverlaysFromConfig() {
  const base = { overlays: {} };

  for (let i = 0; i < OVERLAYS.length; i += 1) {
    base.overlays[OVERLAYS[i]] = { isVisible: false };
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
