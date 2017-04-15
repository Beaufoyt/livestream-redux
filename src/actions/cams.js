import { fromJS } from 'immutable';

import * as types from 'constants/ActionTypes';
import { camData } from '../../spec/fixtures/camData';

export const changeCategory = (id) => ({ type: types.CHANGE_CATEGORY, id });
const receiveCams = (cams, category) => ({ type: types.RECEIVE_CAMS, cams, category });
const requestCams = () => ({ type: types.REQUEST_CAMS });
export const filterRegion = (id) => ({ type: types.FILTER_REGION, id });

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function fetchCams(category) {
  const fetch = (dispatch) => {
    dispatch(requestCams());

    const requestTime = getRandomArbitrary(0, 3) * 1000;
    console.log(requestTime);

    const list = fromJS(camData);
    setTimeout(() => {
      dispatch(receiveCams(list.getIn(['camList']), category));
    }, requestTime);
  };

  return fetch;
}
