import axios from 'axios';

import * as types from '../constants/ActionTypes';

export const addToCount = amount => ({ type: types.NUMBER_COUNTER_ADD, amount });

const factError = () => ({ type: types.NUMBER_FACT_ERROR });
const receiveFact = fact => ({ type: types.NUMBER_FACT_RECEIVE, fact });
const factIsRequesting = () => ({ type: types.NUMBER_FACT_REQUEST });

const url = 'http://numbersapi.com/random';

export function fetchFact() {
    return (dispatch) => {
        dispatch(factIsRequesting());

        axios.get(url).then((response) => {
            dispatch(receiveFact(response.data));
        }).catch(() => {
            dispatch(factError());
        });
    };
}
