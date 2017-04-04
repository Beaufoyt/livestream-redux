import * as types from 'constants/ActionTypes';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

const input = {
  overlays: {
    registerOverlay: {
      isVisible: false,
    },
    otherOverlay: {
      isVisible: false,
    },
  },
};

const list = fromJS(input);

function overlays(state = list, action) {
  switch (action.type) {
    case types.SHOW_OVERLAY:
      return list.setIn(['overlays', action.id, 'isVisible'], true);

    case types.HIDE_OVERLAY:
      return list.setIn(['overlays', action.id, 'isVisible'], false);

    default:
      return state;
  }
}

export default combineReducers({
  overlays,
});
