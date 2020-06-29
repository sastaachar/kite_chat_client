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
  FIREND_REQ_SUCESS,
  FIREND_REQ_FAIL,
  FIREND_REQ_REQUEST,
  FIREND_RES_SUCESS,
  FIREND_RES_FAIL,
  FIREND_RES_REQUEST,
  USERDATA_UPDATE_REQUEST,
  USERDATA_UPDATE_SUCESS,
  USERDATA_UPDATE_FAIL,
} from "./types";

let headers = new Headers();
//no need for these stupid header
headers.append("Content-Type", "application/json");
headers.append("Origin", CLIENT_URL);
headers.append("Access-Control-Allow-Credentials", "true");

export const getFriendInfo = (socket) => (dispatch) => {
  dispatch({
    type: FRIENDINFO_REQUEST,
  });
  let responseOK;

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

export const sendMessage = (message, socket) => (dispatch) => {
  socket.emit("SEND_MESSAGE", message);
  dispatch({
    type: SEND_MESSAGE,
    payload: message,
  });
};

export const sendRequest = (userName, friendName, socket) => (dispatch) => {
  dispatch({
    type: FIREND_REQ_REQUEST,
  });
  let responseOK;
  fetch(`${SERVER_URL}/users/userDetails`, {
    method: "PATCH",
    headers,
    credentials: "include",
    body: JSON.stringify({ add_friend: friendName }),
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
      socket.emit("UPDATE_USER_DETAIL", {
        sender: userName,
        receiver: friendName,
      });
      dispatch({
        type: FIREND_REQ_SUCESS,
      });
      //update details
      dispatch({
        type: USERDATA_UPDATE_SUCESS,
        payload: authDetails.updatedUserDetails,
      });
      //cal the reload friends
      //there is obvio a better way
      getFriendInfo(socket);
    })
    .catch((err) =>
      dispatch({
        type: FIREND_REQ_FAIL,
      })
    );
};

export const respondRequest = (userName, friendName, accepted, socket) => (
  dispatch
) => {
  dispatch({
    type: FIREND_RES_REQUEST,
  });
  let responseOK;
  fetch(`${SERVER_URL}/users/userDetails`, {
    method: "PATCH",
    headers,
    credentials: "include",
    body: JSON.stringify({ requests_response: [{ userName, accepted }] }),
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
      socket.emit("UPDATE_USER_DETAIL", {
        sender: userName,
        receiver: friendName,
      });
      dispatch({
        type: FIREND_RES_SUCESS,
      });
      //update details
      dispatch({
        type: USERDATA_UPDATE_SUCESS,
        payload: authDetails.updatedUserDetails,
      });
      //cal the reload friends
      //there is obvio a better way
      getFriendInfo(socket);
    })
    .catch((err) =>
      dispatch({
        type: FIREND_RES_FAIL,
      })
    );
};

//this method updates all user related data
export const updateUserDetails = (socket) => (dispatch) => {
  //call the users endpoint then call socket io
  dispatch({
    type: USERDATA_UPDATE_REQUEST,
  });

  let headers = new Headers();
  //no need for these stupid header
  headers.append("Content-Type", "application/json");
  headers.append("Origin", CLIENT_URL);
  headers.append("Access-Control-Allow-Credentials", "true");

  //make new funtion out of this called getuser call it here and in the chatPageactions
  let responseOK;
  fetch(`${SERVER_URL}/users`, {
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
    .then((res) => {
      //we recieved updated data
      dispatch({
        type: USERDATA_UPDATE_SUCESS,
        payload: res.userDetails,
      });
      getFriendInfo(socket);
    })
    .catch((err) => {
      //the preCheck failed
      // no user found on this pc
      dispatch({
        type: USERDATA_UPDATE_FAIL,
        payload: err.message,
      });
    });
};
