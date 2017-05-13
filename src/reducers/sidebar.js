import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import { NAV_ITEMS } from '../constants/NavItems';
import * as types from '../constants/ActionTypes';

const input = {
  size: 'expanded',
  activeNavLink: NAV_ITEMS.HOME,
};

const list = fromJS(input);

function getNewSize(state) {
  return state.get('size') === 'expanded' ? 'contracted' : 'expanded';
}

function sidebar(state = list, action) {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR: {
      return state.setIn(['size'], getNewSize(state));
    }

    case types.SET_ACTIVE_LINK: {
      return state.setIn(['activeNavLink'], action.id);
    }

    default:
      return state;
  }
}

export default combineReducers({
  sidebar,
});
