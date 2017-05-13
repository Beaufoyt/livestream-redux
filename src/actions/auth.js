import * as types from '../constants/ActionTypes';

const registerResponse = error => ({ type: types.REGISTER_RESPONSE, error });
const registerRequest = () => ({ type: types.REGISTER_REQUEST });
const loginResponse = (isLoggedIn, error) => ({ type: types.LOGIN_RESPONSE, isLoggedIn, error });
const loginRequest = () => ({ type: types.LOGIN_REQUEST });
export const clearError = () => ({ type: types.CLEAR_AUTH_ERROR });

export function register(details) {
  const fetch = (dispatch) => {
    dispatch(registerRequest());

    const username = encodeURIComponent(details.username);
    const terms = encodeURIComponent(details.tncAccepted);
    const password = encodeURIComponent(details.password);
    const formData = `username=${username}&terms=${terms}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:3001/api/registered');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      let error = null;
      if (xhr.status === 200) {
        dispatch(registerResponse(error));
      } else {
        error = {
          status: xhr.status,
          detail: 'Register Failed',
        };

        dispatch(registerResponse(error));
      }
    });
    xhr.send(formData);
  };

  return fetch;
}

export function login(details) {
  const fetch = (dispatch) => {
    dispatch(loginRequest());
    const response = {};
    response.status = 500;
    let error = null;

    setTimeout(() => {
      if (response.status === 200) {
        console.log(details);

        dispatch(loginResponse(true, error));
      } else {
        error = {
          status: response.status,
          detail: 'Incorrect Details',
        };

        dispatch(loginResponse(false, error));
      }
    }, 5000);
  };

  return fetch;
}
