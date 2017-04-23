import * as types from 'constants/ActionTypes';
import { List, fromJS } from 'immutable';
import { combineReducers } from 'redux';

import { CAM_TYPES } from '../constants/CamConstants.js';

const camOptionsList = {
  requesting: false,
  requestingMore: false,
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
      if (action.error) {
        return state.merge({
          error: action.error,
          requesting: false,
          requestingMore: false,
        });
      }

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
        requestingMore: false,
        error: null,
      });
    }

    case types.CHANGE_CATEGORY:
      return state.setIn(['currentCamCategory'], action.id);

    case types.REQUEST_CAMS:
      if (action.isFirstRequest) {
        return state.setIn(['requesting'], true);
      }
      return state.setIn(['requestingMore'], true);

    default:
      return state;
  }
}

export default combineReducers({
  cams,
});
