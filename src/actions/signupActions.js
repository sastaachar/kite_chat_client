import {
  SIGNUP_REQUEST,
  SIGNUP_FAIL,
  SIGNUP_SUCESS,
  SERVER_URL,
  CLIENT_URL,
  SIGNUP_RESET,
} from "./types";

// signup
export const signupUser = (userData) => (dispatch) => {
  //3 dispathces used here
  //before fetch set to loading

  //to starting loading
  dispatch({
    type: SIGNUP_REQUEST,
    payload: {},
  });

  let headers = new Headers();
  //no need for these stupid header
  headers.append("Content-Type", "application/json");
  headers.append("Origin", CLIENT_URL);
  headers.append("Access-Control-Allow-Credentials", "true");
  let responseOK;
  fetch(`${SERVER_URL}/users/signup`, {
    method: "POST",
    headers,
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
    .then((userDetails) => {
      //user sucessfully signedup in
      dispatch({
        type: SIGNUP_SUCESS,
        payload: userDetails.userName,
      });
    })
    .catch((err) => {
      //the err meesage will be in payload
      //payload will be either a error message or userdetails
      dispatch({
        type: SIGNUP_FAIL,
        payload: err.message,
      });
    });
};

export const signupReset = () => (dispatch) => {
  dispatch({
    type: SIGNUP_RESET,
  });
};
