import {
  LOGIN_REQUEST,
  LOGIN_SUCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

const initialState = {
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
        userDetails: action.payload,
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
