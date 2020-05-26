import { PRECHECK_REQUEST, LOGIN_SUCESS, PRECHECK_FAIL } from "./types";

const SERVER_URL = "http://localhost:5000";

// login
export const preCheck = () => (dispatch) => {
  dispatch({
    type: PRECHECK_REQUEST,
  });
  //check for jwt in local storage
  //       if found send to server
  //            if fail
  //                try with refresh token
  //                    if pass LOGIN_SUCESS
  //                    else PRECHECK_OVER
  //            else sucess LOGIN_SUCESS
  //        else if not found
  //            PRECHECK_OVER
};

//jsut for develpoment
export const preCheckSucess = () => (dispatch) => {
  dispatch({
    type: LOGIN_SUCESS,
  });
};
//jsut for develpoment
export const preCheckFail = () => (dispatch) => {
  dispatch({
    type: PRECHECK_FAIL,
  });
};
