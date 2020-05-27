import {
  LOGIN_SUCESS,
  PRECHECK_REQUEST,
  PRECHECK_FAIL,
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case PRECHECK_REQUEST:
      return {
        ...state,
        complete: false,
      };
    case PRECHECK_FAIL:
      return {
        ...state,
        complete: true,
      };
    case LOGIN_SUCESS:
      return {
        ...state,
        complete: true,
      };
    default:
      return state;
  }
}
