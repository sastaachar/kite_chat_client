import io from "socket.io-client";

import {
  CHAT_SERVER_URL,
  SOCKETCON_SUCESS,
  SOCKETCON_FAIL,
  SOCKETCON_REQUEST,
} from "./types";

export const socketioConnection = () => (dispatch) => {
  dispatch({
    type: SOCKETCON_REQUEST,
  });
  let socket = io(CHAT_SERVER_URL);
  socket.on("connected", (msg) => {
    dispatch({
      type: SOCKETCON_SUCESS,
      payload: socket,
    });
  });
};

//call this if socket could not be connected
export const socketConTimeout = () => (dispatch) => {
  dispatch({
    type: SOCKETCON_FAIL,
  });
};
