const classnames = (...args) => {
    const base = [];

    args.forEach((arg) => {
        switch (typeof arg) {
        case 'object':
            Object.keys(arg).forEach((objectClass) => {
                if (arg[objectClass]) {
                    base.push(objectClass);
                }
            });
            break;

        case 'number':
        case 'string':
            base.push(arg);
            break;

        default:
            break;
        }
    });

    return base.join(' ');
};

export default classnames;
