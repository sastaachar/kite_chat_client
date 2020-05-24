import { LOGIN_REQUEST, LOGIN_SUCESS, LOGIN_FAIL } from "./types";

const SERVER_URL = "http://localhost:5000";

// login
export const loginUser = (userData) => (dispatch) => {
  //3 dispathces used here
  //before fetch set to loading
  //in then we got
  // else error
  dispatch({
    type: LOGIN_REQUEST,
    payload: {},
  });
  fetch(`${SERVER_URL}/users/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      res.json();
    })
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
