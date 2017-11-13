export function newState(state, params) {
    return Object.assign({}, state, params);
}

export function newFormState(state, formId) {
    return newState(state, {
        [formId]: newState(state[formId]),
    });
}
