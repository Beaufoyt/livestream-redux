import { fromJS } from 'immutable';

import * as types from 'constants/ActionTypes';
import { camData } from '../../spec/fixtures/camData';
import { CAM_TYPES } from 'constants/CamTypes';

export const changeCategory = (id) => ({ type: types.CHANGE_CATEGORY, id });
const receiveCams = (cams, isFirstRequest) => ({ type: types.RECEIVE_CAMS, cams, isFirstRequest });
const requestCams = () => ({ type: types.REQUEST_CAMS });
const camError = () => ({ type: types.CAM_ERROR });
export const filterRegion = (id) => ({ type: types.FILTER_REGION, id });

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let requestStart = 0;
let requestEnd = 20;

function getCamsByCategory(category, startIndex, endIndex) {
  if (category === CAM_TYPES.GIRLS) {
    return fromJS(camData.camList.filter((cam) => { return cam.category === category; }));
  }

  return fromJS(camData.camList.slice(startIndex, endIndex));
}

export function fetchCams(category, isFirstRequest) {
  const fetch = (dispatch) => {
    if (isFirstRequest) {
      dispatch(requestCams());
      requestStart = 0;
      requestEnd = 20;
    }

    const requestTime = getRandomArbitrary(0, 3) * 1000;

    setTimeout(() => {
      const list = getCamsByCategory(category, requestStart, requestEnd);

      if (list.size > 0) {
        dispatch(receiveCams(list, isFirstRequest));
      } else {
        dispatch(camError());
      }
      requestStart += 20;
      requestEnd += 20;
    }, requestTime);
  };

  return fetch;
}
