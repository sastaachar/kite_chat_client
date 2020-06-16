import { LOGOUT, LOGOUT_FAIL, SERVER_URL, CLIENT_URL } from "./types";

// logout
export const logoutUser = () => (dispatch) => {
  //delete the jwt and refresh token

  //send request to server to delete the tokens

  let headers = new Headers();
  //no need for these stupid header
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
  headers.append("Origin", CLIENT_URL);
  headers.append("Access-Control-Allow-Credentials", "true");
  fetch(`${SERVER_URL}/users/logout`, {
    headers,
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Server error");
      }
      dispatch({
        type: LOGOUT,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGOUT_FAIL,
      });
    });
};
