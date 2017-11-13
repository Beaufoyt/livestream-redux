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
    const numberRegex = /^\d+$/;

    switch (validationType) {
    case 'required':
        return validateRequired(value);

    case 'number':
        return numberRegex.test(value);

    case 'unsignedNumber':
        return numberRegex.test(value) && value > 0;

    default:
        return true;

    }
};
