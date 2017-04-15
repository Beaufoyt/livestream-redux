import { fromJS } from 'immutable';

import * as types from 'constants/ActionTypes';
import { camData } from '../../spec/fixtures/camData';

export const changeCategory = (id) => ({ type: types.CHANGE_CATEGORY, id });
const receiveCams = (cams, category) => ({ type: types.RECEIVE_CAMS, cams, category });
const requestCams = () => ({ type: types.REQUEST_CAMS });
export const filterRegion = (id) => ({ type: types.FILTER_REGION, id });

export function fetchCams(category) {
  const fetch = (dispatch) => {
    dispatch(requestCams());

    const list = fromJS(camData);
    setTimeout(() => {
      dispatch(receiveCams(list.getIn(['camList']), category));
    }, 2000);
  };

  return fetch;
}
