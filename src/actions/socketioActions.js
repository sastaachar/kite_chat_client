import io from "socket.io-client";

import { SERVER_URL, SOCKETCON_SUCESS, SOCKETCON_FAIL } from "./types";

export const socketioConnection = () => (dispatch) => {
  let socket = io(SERVER_URL);
  console.log(socket, socket.id);
  if (socket.connected) {
    dispatch({
      type: SOCKETCON_SUCESS,
      payload: socket,
    });
  } else {
    dispatch({
      type: SOCKETCON_FAIL,
    });
  }
};
