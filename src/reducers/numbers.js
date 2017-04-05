import * as types from 'constants/ActionTypes';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';

function numbers(state = List(), action) {
  switch (action.type) {
    case types.ADD_NUMBER:
      return state.push(Map({
        id: action.id,
        text: action.number,
      }));

    case types.DELETE_NUMBER:
      return state.filter(number => number.get('id') !== action.id);

    case types.DELETE_NUMBERS:
      return state.clear();

    default:
      return state;
  }
}

export default combineReducers({
  numbers,
});
