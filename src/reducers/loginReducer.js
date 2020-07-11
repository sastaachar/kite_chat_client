import {
  LOGIN_REQUEST,
  LOGIN_SUCESS,
  LOGIN_FAIL,
  LOGOUT,
  USERDATA_UPDATE_SUCESS,
  USERDATA_UPDATE_FAIL,
  USERDATA_UPDATE_REQUEST,
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
    case USERDATA_UPDATE_REQUEST:
      return {
        ...state,
        userDataLoading: true,
      };
    case USERDATA_UPDATE_SUCESS:
      return {
        ...state,
        userDetails: action.payload,
        userDataLoading: false,
      };
    case USERDATA_UPDATE_FAIL:
      return {
        ...state,
        error: action.payload,
        userDataLoading: false,
      };
    default:
      return state;
  }
}
