import * as types from 'constants/ActionTypes';
import { combineReducers } from 'redux';

function overlays(state = 'false', action) {
  switch (action.type) {
    case types.SHOW_REGISTER_OVERLAY:
      return 'true';

    case types.HIDE_REGISTER_OVERLAY:
      return 'false';

    default:
      return state;
  }
}

export default combineReducers({
  overlays,
});
