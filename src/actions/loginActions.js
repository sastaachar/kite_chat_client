import { LOGIN_REQUEST, LOGIN_SUCESS, LOGIN_FAIL, LOGOUT } from "./types";

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

  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
  headers.append("Origin", "http://localhost:3000");
  headers.append("Access-Control-Allow-Credentials", "true");

  fetch(`${SERVER_URL}/users/login`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then((authDetails) => {
      //store the jwt token
      localStorage.setItem("jwtToken", authDetails.jwtToken);

      dispatch({
        type: LOGIN_SUCESS,
        payload: authDetails.userDetails,
      });
    })
    .catch((err) =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err,
      })
    );
};

export const logoutUser = (userData) => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
