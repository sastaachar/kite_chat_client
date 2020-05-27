import { LOGOUT, LOGOUT_FAIL, SERVER_URL } from "./types";

// logout
export const logoutUser = () => (dispatch) => {
  //delete the jwt and refresh token

  //send request to server to delete the tokens

  fetch(`${SERVER_URL}/users/logout`, {
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
