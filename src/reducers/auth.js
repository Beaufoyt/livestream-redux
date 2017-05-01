import * as types from 'constants/ActionTypes';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

const authList = {
  isRequesting: false,
  error: null,
};

const list = fromJS(authList);

function auth(state = list, action) {
  switch (action.type) {
    case types.REGISTER_RESPONSE:
      if (action.error) {
        return state.merge({
          isRequesting: false,
          error: action.error,
        });
      }

      return state.set('isRequesting', false);

    case types.REGISTER_REQUEST:
      return state.merge({
        isRequesting: true,
        error: null,
      });

    case types.CLEAR_AUTH_ERROR:
      return state.set('error', null);

    default:
      return state;
  }
}

export default combineReducers({
  auth,
});
