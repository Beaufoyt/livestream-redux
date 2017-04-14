import * as types from 'constants/ActionTypes';
import { List, fromJS } from 'immutable';
import { combineReducers } from 'redux';

import { camData } from '../../spec/fixtures/camData';
import { CAM_TYPES } from '../constants/CamTypes.js';

const camOptionsList = {
  currentCategory: CAM_TYPES.ALL,
  cams: List(),
  activeFilter: null,
};

const optionsList = fromJS(camOptionsList);

function getCams() {
  const list = fromJS(camData);
  return list.getIn(['camList']);
}

const requestAmount = 20;

function cams(state = optionsList, action) {
  switch (action.type) {
    case types.CHANGE_CATEGORY:
      return state.setIn(['currentCategory'], action.id);

    case types.FILTER_REGION:
      return state.setIn(['activeFilter'], action.id);

    case types.REQUEST_CAMS:
      if (state.getIn(['currentCategory']) === CAM_TYPES.ALL) {
        return state.setIn(['cams'], getCams().take(requestAmount));
      } else if (state.getIn(['currentCategory']) === CAM_TYPES.GIRLS) {
        return state.setIn(['cams'], getCams().filter(person => person.get('category') === 'girl').take(requestAmount));
      }
      return state;

    default:
      return state;
  }
}

export default combineReducers({
  cams,
});
