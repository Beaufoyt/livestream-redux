import { newState } from '../services/reducerService';
import * as types from '../constants/ActionTypes';
import { overlays } from '../constants/Overlays';

const defaultOverlayState = {};

Object.keys(overlays).forEach((key) => {
    defaultOverlayState[key] = false;
});

const overlayReducer = (state = defaultOverlayState, action) => {
    switch (action.type) {
    case types.TOGGLE_OVERLAY:
        return newState(state, {
            [action.id]: action.visible,
        });

    default: return state;
    }
};

export default overlayReducer;
