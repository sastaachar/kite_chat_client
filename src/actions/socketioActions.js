import io from "socket.io-client";

import {
  CHAT_SERVER_URL,
  SOCKETCON_SUCESS,
  SOCKETCON_FAIL,
  SOCKETCON_REQUEST,
  RECV_MESSAGE,
} from "./types";

export const socketioConnection = (jwtToken) => (dispatch) => {
  dispatch({
    type: SOCKETCON_REQUEST,
  });
  const options = {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    },
  };
  let socket = io.connect(CHAT_SERVER_URL, options);
  //just for a comformation
  socket.on("connected", (msg) => {
    dispatch({
      type: SOCKETCON_SUCESS,
      payload: socket,
    });
  });
  socket.on("RECV_MESSAGE", (msg) => {
    dispatch({
      type: RECV_MESSAGE,
      payload: msg,
    });
  });
  socket.on("disconnected", (msg) => {
    dispatch({
      type: SOCKETCON_FAIL,
      payload: msg,
    });
  });
};

//call this if socket could not be connected
export const socketConTimeout = () => (dispatch) => {
  dispatch({
    type: SOCKETCON_FAIL,
    payload: "Timeout Error",
  });
};
