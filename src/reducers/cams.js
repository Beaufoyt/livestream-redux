import * as types from 'constants/ActionTypes';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import { CAM_TYPES } from '../constants/CamTypes.js';

const camOptionsList = {
  currrentCategory: CAM_TYPES.ALL,
  filters: [],
};

const optionsList = fromJS(camOptionsList);

function cams(state = optionsList, action) {
  switch (action.type) {
    case types.CHANGE_CATEGORY:
      return optionsList.setIn(['currrentCategory'], action.id);

    default:
      return state;
  }
}

export default combineReducers({
  cams,
});
