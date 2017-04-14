import * as types from 'constants/ActionTypes';

export const changeCategory = (id) => ({ type: types.CHANGE_CATEGORY, id });
export const requestCams = () => ({ type: types.REQUEST_CAMS });
export const filterRegion = (id) => ({ type: types.FILTER_REGION, id });
