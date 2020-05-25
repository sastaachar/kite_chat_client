import {
  LOGIN_REQUEST,
  LOGIN_SUCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

const initialState = {
  userName: "",
  token: "",
  loading: false,
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loggedIn: false,
        loading: true,
      };
    case LOGIN_SUCESS:
      return {
        ...state,
        loggedIn: true,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
}
