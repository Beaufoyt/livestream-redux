import * as types from 'constants/ActionTypes';
import { List, fromJS } from 'immutable';
import { combineReducers } from 'redux';

import { CAM_TYPES } from '../constants/CamTypes.js';

const camOptionsList = {
  requesting: false,
  currentCamCategory: CAM_TYPES.ALL,
  error: null,
  cams: List(),
  activeFilter: null,
};

const optionsList = fromJS(camOptionsList);

function cams(state = optionsList, action) {
  switch (action.type) {
    case types.FILTER_REGION:
      return state.setIn(['activeFilter'], action.id);

    case types.RECEIVE_CAMS: {
      if (action.isFirstRequest) {
        return state.merge({
          cams: action.cams,
          requesting: false,
          error: null,
        });
      }
      let newCams = state.get('cams');
      newCams = newCams.concat(action.cams);
      return state.merge({
        cams: newCams,
        requesting: false,
        error: null,
      });
    }

    case types.CAM_ERROR:
      return state.merge({
        error: true,
        requesting: false,
      });

    case types.CHANGE_CATEGORY:
      return state.setIn(['currentCamCategory'], action.id);

    case types.REQUEST_CAMS:
      return state.setIn(['requesting'], true);

    default:
      return state;
  }
}

export default combineReducers({
  cams,
});
