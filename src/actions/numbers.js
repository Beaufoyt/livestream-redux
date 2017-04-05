import * as types from 'constants/ActionTypes';

let numCounter = 0;
let currentnumber = 0;
export const addNumber = () => ({ type: types.ADD_NUMBER, number: currentnumber++, id: ++numCounter });
export const deleteNumber = id => ({ type: types.DELETE_NUMBER, id });
export const deleteNumbers = () => {
  numCounter = 0;
  currentnumber = 0;
  return { type: types.DELETE_NUMBERS };
};
export const showOverlay = id => ({ type: types.SHOW_OVERLAY, id });
export const hideOverlay = id => ({ type: types.HIDE_OVERLAY, id });
