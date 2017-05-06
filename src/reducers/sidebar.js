import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import * as types from '../constants/ActionTypes';

const input = {
  sidebar: {
    size: 'expanded',
  },
};

const list = fromJS(input);

function getNewSize(state) {
  return state.getIn(['sidebar', 'size']) === 'expanded' ? 'contracted' : 'expanded';
}

function sidebar(state = list, action) {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR: {
      return list.setIn(['sidebar', 'size'], getNewSize(state));
    }
    default:
      return state;
  }
}

export default combineReducers({
  sidebar,
});
