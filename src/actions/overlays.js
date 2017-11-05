import * as types from '../constants/ActionTypes';

export const toggleOverlay = (id, visible) => ({ type: types.TOGGLE_OVERLAY, id, visible });
