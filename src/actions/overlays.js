import * as types from '../constants/ActionTypes';

export const showOverlay = id => ({ type: types.SHOW_OVERLAY, id });
export const hideOverlay = id => ({ type: types.HIDE_OVERLAY, id });
