import * as types from 'constants/ActionTypes';
import { List, fromJS } from 'immutable';
import { combineReducers } from 'redux';

import { CAM_TYPES } from '../constants/CamTypes.js';

const camOptionsList = {
  requesting: false,
  cams: List(),
  activeFilter: null,
};

const optionsList = fromJS(camOptionsList);

const requestAmount = 20;

function cams(state = optionsList, action) {
  switch (action.type) {
    case types.FILTER_REGION:
      return state.setIn(['activeFilter'], action.id);

    case types.RECEIVE_CAMS:
      if (action.category === CAM_TYPES.ALL) {
        return state.merge({
          cams: action.cams.take(requestAmount),
          requesting: false,
        });
      } else if (action.category === CAM_TYPES.GIRLS) {
        return state.merge({
          cams: action.cams.filter(person => person.get('category') === 'girl').take(requestAmount),
          requesting: false,
        });
      }
      return state;

    case types.REQUEST_CAMS:
      return state.setIn(['requesting'], true);

    default:
      return state;
  }
}

export default combineReducers({
  cams,
});
