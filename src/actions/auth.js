import * as types from 'constants/ActionTypes';

const registerResponse = (isLoggedIn, error) => ({ type: types.REGISTER_RESPONSE, isLoggedIn, error });
const registerRequest = () => ({ type: types.REGISTER_REQUEST });

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function register(details) {
  const fetch = (dispatch) => {
    dispatch(registerRequest());

    const requestTime = getRandomArbitrary(0.5, 3) * 1000;

    setTimeout(() => {
      const error = null;
      const response = { status: 200 };

      console.log(details);

      if (response.status === 200) {
        dispatch(registerResponse(true, error));
      } else {
        dispatch(registerResponse(false, error));
      }
    }, requestTime);
  };

  return fetch;
}
