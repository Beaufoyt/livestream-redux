import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import * as types from '../constants/ActionTypes';

const input = {
  broadcaster: {},
};

const list = fromJS(input);

function stream(state = list, action) {
  switch (action.type) {
    case types.RECEIVE_STREAM: {
      return state.setIn(['broadcaster'], action.broadcaster);
    }

    default:
      return state;
  }
}

export default combineReducers({
  stream,
});
