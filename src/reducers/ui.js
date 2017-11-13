import { newState } from '../helpers/reducer';

import * as types from '../constants/actionTypes';
import { breakPoints } from '../constants/breakPoints';

const defaultUiState = {
    screenWidth: typeof window === 'object' ? window.innerWidth : null,
    isMobile: typeof window === 'object' ? window.innerWidth < breakPoints.mobile : false,
};

const ui = (state = defaultUiState, action) => {
    switch (action.type) {
    case types.SCREEN_RESIZE:
        return newState(state, {
            screenWidth: action.screenWidth,
            isMobile: action.screenWidth < breakPoints.mobile,
        });

    default: return state;
    }
};

export default ui;
