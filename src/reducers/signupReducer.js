import { SIGNUP_REQUEST, SIGNUP_FAIL, SIGNUP_SUCESS } from "../actions/types";

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
    default:
      return state;
  }
}
