import * as types from '../constants/ActionTypes';

export const toggleSidebar = () => ({ type: types.TOGGLE_SIDEBAR });
export const setActiveLink = id => ({ type: types.SET_ACTIVE_LINK, id });
