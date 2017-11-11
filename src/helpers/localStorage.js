const localStorage = {
    set: (id, value) => {
        window.localStorage.setItem(id, value);
    },

    remove: (id) => {
        window.localStorage.removeItem(id);
    },

    get: id => window.localStorage.getItem(id),
};

export default localStorage;
