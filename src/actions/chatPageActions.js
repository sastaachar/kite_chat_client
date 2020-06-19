import {
  FRIENDINFO_REQUEST,
  FRIENDINFO_SUCESS,
  FRIENDINFO_FAIL,
  SERVER_URL,
  CLIENT_URL,
} from "./types";

export const getFriendInfo = () => (dispatch) => {
  dispatch({
    type: FRIENDINFO_REQUEST,
  });
  let responseOK;
  let headers = new Headers();
  //no need for these stupid header
  headers.append("Content-Type", "application/json");
  headers.append("Origin", CLIENT_URL);
  headers.append("Access-Control-Allow-Credentials", "true");
  fetch(`${SERVER_URL}/users/friendDetails`, {
    method: "GET",
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
    .then((friendInfo) => {
      dispatch({
        type: FRIENDINFO_SUCESS,
        payload: friendInfo,
      });
    })
    .catch((err) => {
      dispatch({
        type: FRIENDINFO_FAIL,
        error: err.message,
      });
    });
};
