const validateRequired = (value) => {
    switch (typeof value) {
    case 'string':
        return !!value.trim();

    case 'boolean':
        return true;

    default:
        return !!value;
    }
};


export const validateInput = (validationType, value) => {
    switch (validationType) {
    case 'required':
        return validateRequired(value);

    default:
        return true;

    }
};
