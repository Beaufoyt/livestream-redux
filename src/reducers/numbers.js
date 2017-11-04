import { newState } from '../helpers';
import * as types from '../constants/ActionTypes';

const defaultNumbersState = {
    fact: '',
    factIsRequesting: false,
    factError: false,
    count: 0,
};

const numbers = (state = defaultNumbersState, action) => {
    switch (action.type) {
    case types.NUMBER_COUNTER_ADD:
        return newState(state, {
            count: state.count + action.amount,
        });

    case types.NUMBER_FACT_RECEIVE:
        return newState(state, {
            fact: action.fact,
            factIsRequesting: false,
        });

    case types.NUMBER_FACT_REQUEST:
        return newState(state, {
            factIsRequesting: true,
            factError: false,
        });

    case types.NUMBER_FACT_ERROR:
        return newState(state, {
            factError: true,
            factIsRequesting: false,
        });


    default: return state;
    }
};

export default numbers;
