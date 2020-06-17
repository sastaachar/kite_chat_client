import io from "socket.io-client";

import {
  CHAT_SERVER_URL,
  SOCKETCON_SUCESS,
  SOCKETCON_FAIL,
  SOCKETCON_REQUEST,
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
  console.log("requesting ", CHAT_SERVER_URL, " with ", jwtToken);
  let socket = io.connect(CHAT_SERVER_URL, options);

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
