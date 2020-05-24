import { LOGIN_REQUEST, LOGIN_SUCESS, LOGIN_FAIL } from "./types";

const SERVER_URL = "http://localhost:5000";

// login
export const loginUser = (userData) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  fetch(`${SERVER_URL}/users/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: userData,
  })
    .then((res) => res.json())
    .then((authDetails) =>
      dispatch({
        type: LOGIN_SUCESS,
        payload: authDetails,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err,
      })
    );
};
