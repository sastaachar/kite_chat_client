import {
  FRIENDS_INFO_REQUEST,
  FRIENDS_INFO_SUCESS,
  FRIENDS_INFO_FAIL,
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
  FIREND_RMV_REQUEST,
  FIREND_RMV_SUCESS,
  FIREND_RMV_FAIL,
  FIREND_CNCL_REQ_FAIL,
  FIREND_CNCL_REQ_REQUEST,
  FIREND_CNCL_REQ_SUCESS,
} from "./types";

import store from "../store";

// same header used in all functions (need refactoring)
let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Origin", CLIENT_URL);
headers.append("Access-Control-Allow-Credentials", "true");

export const getFriendInfo = (socket) => (dispatch) => {
  dispatch({
    type: FRIENDS_INFO_REQUEST,
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
            type: FRIENDS_INFO_SUCESS,
            payload: { allFriends, onlineFriends },
          });
        }
      );
    })
    .catch((err) => {
      dispatch({
        type: FRIENDS_INFO_FAIL,
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

//this method updates all user related data
export const updateUserDetails = (socket) => (dispatch) => {
  // call the users endpoint then call socket io
  dispatch({
    type: USERDATA_UPDATE_REQUEST,
  });
  // make new funtion out of this called getuser call it here and in the chatPageactions
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
      dispatch({
        type: USERDATA_UPDATE_SUCESS,

        payload: res.userDetails,
      });
      store.dispatch(getFriendInfo(socket));
    })
    .catch((err) => {
      dispatch({
        type: USERDATA_UPDATE_FAIL,
        payload: err.message,
      });
    });
};

// this function will do all the dispatch and fetch
const UserDataUpdateOperation = (
  { reqType, sucessType, failType },
  body,
  { sender, receiver },
  socket,
  dispatch
) => {
  dispatch({
    type: reqType,
  });
  let responseOK;
  fetch(`${SERVER_URL}/users/userDetails`, {
    method: "PATCH",
    headers,
    credentials: "include",
    body: JSON.stringify(body),
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
        sender,
        receiver,
      });
      dispatch({
        type: sucessType,
      });
      //update details
      dispatch({
        type: USERDATA_UPDATE_SUCESS,
        payload: authDetails.updatedUserDetails,
      });
      //cal the reload friends
      //there is obvio a better way
      dispatch(getFriendInfo(socket));
    })
    .catch((err) =>
      dispatch({
        type: failType,
      })
    );
};

// send request
export const sendRequest = (userName, friendName, socket) => (dispatch) => {
  UserDataUpdateOperation(
    {
      reqType: FIREND_REQ_REQUEST,
      sucessType: FIREND_REQ_SUCESS,
      failType: FIREND_REQ_FAIL,
    },
    { add_friend: friendName },
    {
      sender: userName,
      receiver: friendName,
    },
    socket,
    dispatch
  );
};

// respond to a friend request
export const respondRequest = (userName, friendName, accepted, socket) => (
  dispatch
) => {
  UserDataUpdateOperation(
    {
      reqType: FIREND_RES_REQUEST,
      sucessType: FIREND_RES_SUCESS,
      failType: FIREND_RES_FAIL,
    },
    {
      requests_response: [{ userName: friendName, accepted }],
    },
    {
      sender: userName,
      receiver: friendName,
    },
    socket,
    dispatch
  );
};

// unfriend operation
export const removeFriend = (userName, friendName, socket) => (dispatch) => {
  UserDataUpdateOperation(
    {
      reqType: FIREND_RMV_REQUEST,
      sucessType: FIREND_RMV_SUCESS,
      failType: FIREND_RMV_FAIL,
    },
    {
      remove_friends: [friendName],
    },
    {
      sender: userName,
      receiver: friendName,
    },
    socket,
    dispatch
  );
};

// cancel approval from friend
export const cancelRequest = (userName, friendName, socket) => (dispatch) => {
  UserDataUpdateOperation(
    {
      reqType: FIREND_CNCL_REQ_REQUEST,
      sucessType: FIREND_CNCL_REQ_SUCESS,
      failType: FIREND_CNCL_REQ_FAIL,
    },
    {
      cancel_approval: [friendName],
    },
    {
      sender: userName,
      receiver: friendName,
    },
    socket,
    dispatch
  );
};
