import { LOGIN_REQUEST, LOGIN_SUCESS, LOGIN_FAIL } from "../actions/types";

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
        loading: true,
      };
    case LOGIN_SUCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
