import { fromJS } from 'immutable';

import * as types from '../constants/ActionTypes';
import camData from '../../spec/fixtures/camData';

const requestStream = () => ({ type: types.REQUEST_STREAM });
const receiveStream = broadcaster => ({ type: types.RECEIVE_STREAM, broadcaster });

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default function fetchStream(id) {
  const fetch = (dispatch) => {
    dispatch(requestStream());

    const requestTime = getRandomArbitrary(0.5, 3) * 1000;

    setTimeout(() => {
      // ======= REQUEST GOES HERE ========
      const userObject = fromJS(camData.camList.filter((user) => { return user.name === id; })[0]);
      // ==================================
      dispatch(receiveStream(userObject));
    }, requestTime);
  };

  return fetch;
}
