// login req - sucess / fail
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCESS = "LOGIN_SUCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

// logout
export const LOGOUT = "LOGOUT";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

//to check if already loggedin
export const PRECHECK_REQUEST = "PRECHECK_REQUEST";
export const PRECHECK_SUCESS = "PRECHECK_SUCESS";
export const PRECHECK_FAIL = "PRECHECK_FAIL";

// signup req - sucess / fail
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCESS = "SIGNUP_SUCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

// after login socket - req - success / fail
export const SOCKETCON_REQUEST = "SOCKETCON_REQUEST";
export const SOCKETCON_SUCESS = "SOCKETCON_SUCESS";
export const SOCKETCON_FAIL = "SOCKETCON_FAIL";

// get friend info from server request
export const FRIENDINFO_REQUEST = "FRIENDINFO_REQUEST";
export const FRIENDINFO_SUCESS = "FRIENDINFO_SUCESS";
export const FRIENDINFO_FAIL = "FRIENDINFO_FAIL";

// friend came online
export const FIREND_CONNECTED = "FIREND_CONNECTED";

//friend went offline
export const FIREND_DISCONNECTED = "FIREND_DISCONNECTED";

//selected a firend from the friend list
export const FIREND_SELECTED = "FIREND_SELECTED";

//recieved a message
export const RECV_MESSAGE = "RECV_MESSAGE";

//sent a mesage
export const SEND_MESSAGE = "SEND_MESSAGE";

// used for login redirection after signup
export const SIGNUP_RESET = "SIGNUP_RESET";

//send a friend request sent - req - sucess / fail
export const FIREND_REQ_REQUEST = "FIREND_REQ_REQUEST";
export const FIREND_REQ_SUCESS = "FIREND_REQ_SUCESS";
export const FIREND_REQ_FAIL = "FIREND_REQ_FAIL";

// accepted a pending request - req - sucess / fail
export const FIREND_RES_REQUEST = "FIREND_RES_REQUEST";
export const FIREND_RES_SUCESS = "FIREND_RES_SUCESS";
export const FIREND_RES_FAIL = "FIREND_RES_FAIL";

// remove an existing friend - req - sucess / fail
export const FIREND_REMOVE_REQUEST = "FIREND_REMOVE_REQUEST";
export const FIREND_REMOVE_SUCESS = "FIREND_REMOVE_SUCESS";
export const FIREND_REMOVE_FAIL = "FIREND_REMOVE_FAIL";

// update my userdata in state
export const USERDATA_UPDATE_REQUEST = "USERDATA_UPDATE_REQUEST";
export const USERDATA_UPDATE_SUCESS = "USERDATA_UPDATE_SUCESS";
export const USERDATA_UPDATE_FAIL = "USERDATA_UPDATE_FAIL";

// ALL EXTERNAL URLS
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
