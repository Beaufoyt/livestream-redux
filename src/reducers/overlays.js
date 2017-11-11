import { newState } from '../helpers/reducer';
import * as types from '../constants/ActionTypes';
import { overlays } from '../constants/Overlays';

const defaultOverlayState = {};

Object.keys(overlays).forEach((key) => {
    defaultOverlayState[key] = false;
});

const overlayReducer = (state = defaultOverlayState, action) => {
    switch (action.type) {
    case types.TOGGLE_OVERLAY:
        if (action.visible) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return newState(state, {
            [action.id]: action.visible,
        });

    default: return state;
    }
};

export default overlayReducer;
