import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import precheckReducer from "./precheckReducer";
import signupReducer from "./signupReducer";

export default combineReducers({
  loginData: loginReducer,
  preCheck: precheckReducer,
  signupData: signupReducer,
});
