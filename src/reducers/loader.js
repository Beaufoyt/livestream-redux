import { newState } from '../helpers/reducer';
import * as types from '../constants/actionTypes';

const defaultSidebarState = {
    loading: false,
};

const sidebar = (state = defaultSidebarState, action) => {
    switch (action.type) {
    case types.LOADER_START:
        return newState(state, {
            loading: true,
        });

    case types.LOADER_COMPLETE:
        return newState(state, {
            loading: false,
        });

    default: return state;
    }
};

export default sidebar;
