import { fromJS } from 'immutable';

import * as types from '../constants/ActionTypes';

const numbersTypes = {
    fact: '',
    factIsRequesting: false,
    factError: false,
    count: 0,
};

const defaultNumbersState = fromJS(numbersTypes);

function numbers(state = defaultNumbersState, action) {
    switch (action.type) {
    case types.NUMBER_COUNTER_ADD:
        return state.set('count', state.get('count') + action.amount);

    case types.NUMBER_FACT_RECEIVE:
        return state.merge({
            fact: action.fact,
            factIsRequesting: false,
        });

    case types.NUMBER_FACT_REQUEST:
        return state.merge({
            factIsRequesting: true,
            factError: false,
        });

    case types.NUMBER_FACT_ERROR:
        return state.merge({
            factError: true,
            factIsRequesting: false,
        });


    default:
        return state;
    }
}

export default numbers;
