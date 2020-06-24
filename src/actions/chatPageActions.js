import {
  FRIENDINFO_REQUEST,
  FRIENDINFO_SUCESS,
  FRIENDINFO_FAIL,
  SERVER_URL,
  CLIENT_URL,
  FIREND_DISCONNECTED,
  FIREND_CONNECTED,
  FIREND_SELECTED,
  SEND_MESSAGE,
} from "./types";

export const getFriendInfo = (socket) => (dispatch) => {
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
    .then(({ allFriends }) => {
      //dispatch once we get both the friendsList and the onlineFriends
      socket.emit(
        "onlineFriendList",
        allFriends.map((friend) => friend.userName),
        ({ onlineFriends }) => {
          dispatch({
            type: FRIENDINFO_SUCESS,
            payload: { allFriends, onlineFriends },
          });
        }
      );
    })
    .catch((err) => {
      dispatch({
        type: FRIENDINFO_FAIL,
        error: err.message,
      });
    });
};

export const friendConnected = (userName) => (dispatch) => {
  dispatch({
    type: FIREND_CONNECTED,
    payload: userName,
  });
};

export const friendDisconnected = (userName) => (dispatch) => {
  dispatch({
    type: FIREND_DISCONNECTED,
    payload: userName,
  });
};

export const selectFriend = (userName) => (dispatch) => {
  dispatch({
    type: FIREND_SELECTED,
    payload: userName,
  });
};

export const sendMessage = (message) => (dispatch) => {
  dispatch({
    type: SEND_MESSAGE,
    payload: message,
  });
};
