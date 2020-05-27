import { LOGOUT } from "./types";

// logout
export const logoutUser = () => (dispatch) => {
  //delete the jwt and refresh token

  localStorage.removeItem("jwtToken");

  dispatch({
    type: LOGOUT,
  });
};
