export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCESS = "LOGIN_SUCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const PRECHECK_REQUEST = "PRECHECK_REQUEST";
export const PRECHECK_SUCESS = "PRECHECK_SUCESS";
export const PRECHECK_FAIL = "PRECHECK_FAIL";
export const LOGOUT_FAIL = "LOGOUT_FAIL";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCESS = "SIGNUP_SUCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const SOCKETCON_FAIL = "SOCKETCON_FAIL";
export const SOCKETCON_SUCESS = "SOCKETCON_SUCESS";
export const SOCKETCON_REQUEST = "SOCKETCON_REQUEST";
export const FRIENDINFO_REQUEST = "FRIENDINFO_REQUEST";
export const FRIENDINFO_SUCESS = "FRIENDINFO_SUCESS";
export const FRIENDINFO_FAIL = "FRIENDINFO_FAIL";
export const FIREND_CONNECTED = "FIREND_CONNECTED";
export const FIREND_DISCONNECTED = "FIREND_DISCONNECTED";
export const FIREND_SELECTED = "FIREND_SELECTED";
export const RECV_MESSAGE = "RECV_MESSAGE";
export const SEND_MESSAGE = "SEND_MESSAGE";

//pls forgive me for declaring these here.
export const SERVER_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://kite-chat-server.herokuapp.com";

export const CLIENT_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://kite-chat.herokuapp.com";

export const CHAT_SERVER_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:2500"
    : "https://kite-chat-chatserver.herokuapp.com";
