import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import precheckReducer from "./precheckReducer";
export default combineReducers({
  loginData: loginReducer,
  preCheck: precheckReducer,
});
