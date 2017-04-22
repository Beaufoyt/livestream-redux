import { fromJS } from 'immutable';

import * as types from 'constants/ActionTypes';
import { camData } from '../../spec/fixtures/camData';

export const changeCategory = (id) => ({ type: types.CHANGE_CATEGORY, id });
const receiveCams = (cams, category, isFirstRequest) => ({ type: types.RECEIVE_CAMS, cams, category, isFirstRequest });
const requestCams = (isFirstRequest) => ({ type: types.REQUEST_CAMS, isFirstRequest });
export const filterRegion = (id) => ({ type: types.FILTER_REGION, id });

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let requestStart = 0;
let requestEnd = 20;

export function fetchCams(category, isFirstRequest) {
  const fetch = (dispatch) => {
    dispatch(requestCams(isFirstRequest));

    const requestTime = getRandomArbitrary(0, 3) * 1000;

    if (isFirstRequest) {
      requestStart = 0;
      requestEnd = 20;
    }

    const list = fromJS(camData.camList.slice(requestStart, requestEnd));

    setTimeout(() => {
      requestStart += 20;
      requestEnd += 20;
      dispatch(receiveCams(list, category, isFirstRequest));
    }, requestTime);
  };

  return fetch;
}
