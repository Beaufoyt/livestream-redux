import { newState } from '../helpers/reducer';

import * as types from '../constants/ActionTypes';
import { breakpoints } from '../constants/BreakPoints';

const defaultUiState = {
    screenWidth: typeof window === 'object' ? window.innerWidth : null,
    isMobile: typeof window === 'object' ? window.innerWidth < breakpoints.mobile : false,
};

const ui = (state = defaultUiState, action) => {
    switch (action.type) {
    case types.SCREEN_RESIZE:
        return newState(state, {
            screenWidth: action.screenWidth,
            isMobile: action.screenWidth < breakpoints.mobile,
        });

    default: return state;
    }
};

export default ui;
