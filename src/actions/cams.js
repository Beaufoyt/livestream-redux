import { fromJS } from 'immutable';

import * as types from '../constants/ActionTypes';

export const changeCategory = id => ({ type: types.CHANGE_CATEGORY, id });
const receiveCams = (cams, isFirstRequest, error) => ({ type: types.RECEIVE_CAMS, cams, isFirstRequest, error });
const requestCams = isFirstRequest => ({ type: types.REQUEST_CAMS, isFirstRequest });
export const filterRegion = id => ({ type: types.FILTER_REGION, id });

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let requestStart = 0;
let requestEnd = 20;

export function fetchCams(category, isFirstRequest) {
    const fetch = (dispatch) => {
        if (isFirstRequest) {
            requestStart = 0;
            requestEnd = 20;
        }

        dispatch(requestCams(isFirstRequest));

        const requestTime = getRandomArbitrary(0.5, 3) * 1000;
    };

    return fetch;
}
