import { newState } from '../helpers/reducer';
import * as types from '../constants/actionTypes';

const defaultSidebarState = {
    isOpen: true,
};

const sidebar = (state = defaultSidebarState, action) => {
    switch (action.type) {
    case types.TOGGLE_SIDEBAR:
        return newState(state, {
            isOpen: action.bool,
        });

    default: return state;
    }
};

export default sidebar;
