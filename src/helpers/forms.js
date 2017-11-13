export const isFormValid = (form) => {
    let isValid = true;

    Object.keys(form.fields).forEach((field) => {
        if (!form.fields[field].isValid) {
            isValid = false;
        }
    });

    return isValid;
};


export const getPayload = (form) => {
    const payload = {};

    Object.keys(form.fields).forEach((field) => {
        payload[field] = form.fields[field].value;
    });

    return payload;
};
