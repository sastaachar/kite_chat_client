import {
  LOGIN_REQUEST,
  LOGIN_SUCESS,
  LOGIN_FAIL,
  SERVER_URL,
  CLIENT_URL,
} from "./types";

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

  let responseOK;
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "https://localhost:3000");
  headers.append("Origin", CLIENT_URL);
  headers.append("Access-Control-Allow-Credentials", "true");
  fetch(`${SERVER_URL}/users/login`, {
    method: "POST",
    headers,
    //credentials: "include",
    body: JSON.stringify(userData),
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
    .then((authDetails) => {
      dispatch({
        type: LOGIN_SUCESS,
        payload: authDetails.userDetails,
      });
    })
    .catch((err) =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err.message,
      })
    );
};
