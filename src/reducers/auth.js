import * as types from 'constants/ActionTypes';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

const authList = {
  isRequesting: false,
};

const list = fromJS(authList);

function auth(state = list, action) {
  switch (action.type) {
    case types.REGISTER_RESPONSE:
      return state.set('isRequesting', false);

    case types.REGISTER_REQUEST:
      return state.set('isRequesting', true);

    default:
      return state;
  }
}

export default combineReducers({
  auth,
});
