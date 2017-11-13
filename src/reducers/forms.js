import forms from '../constants/forms';
import * as types from '../constants/actionTypes';
import { newFormState } from '../helpers/reducer';

const defaultFormState = {};

Object.keys(forms).forEach((form) => {
    defaultFormState[form] = {
        hasSumbit: false,
        fields: {},
    };

    forms[form].forEach((field) => {
        defaultFormState[form].fields[field] = {
            value: '',
            isValid: true,
        };
    });
});

const formsReducer = (state = defaultFormState, action) => {
    let newForm = {};

    switch (action.type) {
    case types.SET_FORM_VALUE:
        newForm = newFormState(state, action.formId);
        newForm[action.formId].fields[action.id] = {
            value: action.value,
            isValid: action.isValid,
        };

        return newForm;

    default: return state;
    }
};

export default formsReducer;
