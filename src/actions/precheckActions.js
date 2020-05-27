import {
  PRECHECK_REQUEST,
  LOGIN_SUCESS,
  PRECHECK_FAIL,
  SERVER_URL,
} from "./types";

// login
export const preCheck = () => (dispatch) => {
  dispatch({
    type: PRECHECK_REQUEST,
  });

  fetch(`${SERVER_URL}/users`, {
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((res) => {
      //user alrady logged in

      dispatch({
        type: LOGIN_SUCESS,
        payload: res.userDetails,
      });
    })
    .catch((err) => {
      //the preCheck failed
      dispatch({
        type: PRECHECK_FAIL,
        payload: err,
      });
    });
};
