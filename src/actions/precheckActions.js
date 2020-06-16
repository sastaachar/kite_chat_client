import {
  PRECHECK_REQUEST,
  LOGIN_SUCESS,
  PRECHECK_FAIL,
  SERVER_URL,
  CLIENT_URL,
} from "./types";

// login
export const preCheck = () => (dispatch) => {
  dispatch({
    type: PRECHECK_REQUEST,
  });

  let headers = new Headers();
  //no need for these stupid header
  headers.append("Content-Type", "application/json");
  headers.append("Origin", CLIENT_URL);
  headers.append("Access-Control-Allow-Credentials", "true");
  let responseOK;
  fetch(`${SERVER_URL}/users`, {
    headers,
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
      //user has already logged in this pc
      dispatch({
        type: LOGIN_SUCESS,
        payload: res.userDetails,
      });
    })
    .catch((err) => {
      //the preCheck failed
      // no user found on this pc
      dispatch({
        type: PRECHECK_FAIL,
        payload: err.message,
      });
    });
};
