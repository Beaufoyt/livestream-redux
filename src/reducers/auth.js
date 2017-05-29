import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import LocalStorage from '../services/localStorageService';
import * as types from '../constants/ActionTypes';

const authList = {
  isRequesting: false,
  error: null,
  user: JSON.parse(LocalStorage.getUser()),
  isLoggedIn: LocalStorage.isLoggedIn(),
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

    case types.LOGIN_REQUEST:
      return state.merge({
        isRequesting: true,
        error: null,
      });

    case types.LOGIN_RESPONSE: {
      if (!action.isLoggedIn) {
        return state.merge({
          isRequesting: false,
          error: action.error,
          isLoggedIn: false,
          user: null,
        });
      }

      LocalStorage.set('isLoggedIn', true);
      LocalStorage.set('user', JSON.stringify({ name: action.username }));

      return state.merge({
        isRequesting: false,
        error: action.error,
        isLoggedIn: action.isLoggedIn,
        user: {
          name: action.username,
        },
      });
    }

    default:
      return state;
  }
}

export default combineReducers({
  auth,
});
