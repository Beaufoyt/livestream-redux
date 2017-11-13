import * as types from '../constants/actionTypes';

export const setFormValue = (formId, id, value, isValid) => ({
    type: types.SET_FORM_VALUE, formId, id, value, isValid,
});
