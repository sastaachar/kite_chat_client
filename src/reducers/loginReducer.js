import { LOGIN_REQUEST, LOGIN_SUCESS, LOGIN_FAIL } from "../actions/types";

const initialState = {
  userName: "",
  token: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        items: action.payload,
      };
    case LOGIN_SUCESS:
      return {
        ...state,
        item: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
