import * as types from '../constants/ActionTypes';

const registerResponse = (isLoggedIn, error) => ({ type: types.REGISTER_RESPONSE, isLoggedIn, error });
const registerRequest = () => ({ type: types.REGISTER_REQUEST });
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
        dispatch(registerResponse(true, error));
      } else {
        error = {
          status: xhr.status,
          detail: 'Register Failed',
        };

        dispatch(registerResponse(false, error));
      }
    });
    xhr.send(formData);
  };

  return fetch;
}
