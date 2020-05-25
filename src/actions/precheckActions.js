import { PRECHECK } from "./types";

const SERVER_URL = "http://localhost:5000";

// login
export const preCheck = (userData) => (dispatch) => {
  dispatch({
    type: PRECHECK,
  });
  //check for jwt in local storage
  //if found send to server
  //if fail
};
