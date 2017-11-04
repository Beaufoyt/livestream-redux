import { fromJS } from 'immutable';

import * as types from '../constants/ActionTypes';

const sidebarState = {
    isOpen: true,
};

const defaultSidebarState = fromJS(sidebarState);

const sidebar = (state = defaultSidebarState, action) => {
    switch (action.type) {
    case types.TOGGLE_SIDEBAR:
        return state.set('isOpen', action.bool);

    default: return state;
    }
};

export default sidebar;
