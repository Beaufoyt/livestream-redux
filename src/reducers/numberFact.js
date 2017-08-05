import { List, fromJS } from 'immutable';
import { combineReducers } from 'redux';

import * as types from '../constants/ActionTypes';

const camOptionsList = {
    requesting: false,
    requestingMore: false,
    error: null,
    cams: List(),
    activeFilter: null,
};

const optionsList = fromJS(camOptionsList);

function cams(state = optionsList, action) {
    switch (action.type) {

    case types.RECEIVE_CAMS: {
        if (action.error) {
            return state.merge({
                error: action.error,
                requesting: false,
                requestingMore: false,
            });
        }

        if (action.isFirstRequest) {
            return state.merge({
                cams: action.cams,
                requesting: false,
                error: null,
            });
        }

        return null;
    }

    default:
        return state;
    }
}

export default combineReducers({
    cams,
});
