const localStorageService = {
  set: (id, value) => {
    window.localStorage.setItem(id, value);
  },

  remove: (id) => {
    window.localStorage.removeItem(id);
  },

  get: (id) => {
    return window.localStorage.getItem(id);
  },

  getUser: () => {
    return window.localStorage.getItem('user');
  },

  isLoggedIn: () => {
    return window.localStorage.getItem('isLoggedIn');
  },
};

export default localStorageService;
