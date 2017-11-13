import * as types from '../constants/actionTypes';

export const toggleOverlay = (id, visible) => ({ type: types.TOGGLE_OVERLAY, id, visible });
