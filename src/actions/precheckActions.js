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

  let responseOK;
  fetch(`${SERVER_URL}/users`, {
    credentials: "include",
  })
    .then((res) => {
      //to check if response is ok
      responseOK = res.ok;
      return res.json();
    })
    .then((jsonRes) => {
      //check if response is ok
      if (!responseOK) {
        //server will send error in res.message
        throw Error(jsonRes.message);
      }
      return jsonRes;
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
        payload: err.message,
      });
    });
};
