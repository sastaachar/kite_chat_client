import {
  SIGNUP_REQUEST,
  SIGNUP_FAIL,
  SIGNUP_SUCESS,
  SIGNUP_RESET,
} from "../actions/types";

const initialState = {
  signupSucess: false,
  loading: false,
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        signupSucess: false,
        loading: true,
      };
    case SIGNUP_SUCESS:
      return {
        ...state,
        signupSucess: true,
        loading: false,
        userName: action.payload,
        error: "",
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        signupSucess: false,
        loading: false,
        error: action.payload,
      };
    case SIGNUP_RESET:
      return {
        ...state,
        signupSucess: false,
      };
    default:
      return state;
  }
}
