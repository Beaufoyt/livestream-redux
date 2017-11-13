import * as types from '../constants/actionTypes';

export const loaderStart = () => ({ type: types.LOADER_START });
export const loaderComplete = () => ({ type: types.LOADER_COMPLETE });

export const fakeLoad = (length) => {
    return (dispatch) => {
        dispatch(loaderStart());

        setTimeout(() => {
            dispatch(loaderComplete());
        }, length);
    };
};
