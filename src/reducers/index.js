import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import precheckReducer from "./precheckReducer";
import signupReducer from "./signupReducer";
import socketioReducer from "./socketioReducer";
export default combineReducers({
  loginData: loginReducer,
  preCheck: precheckReducer,
  signupData: signupReducer,
  socketData: socketioReducer,
});
