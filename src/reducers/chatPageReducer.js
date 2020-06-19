import {
  FRIENDINFO_REQUEST,
  FRIENDINFO_FAIL,
  FRIENDINFO_SUCESS,
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case FRIENDINFO_REQUEST:
      return {
        ...state,
        friendListWait: true,
      };
    case FRIENDINFO_FAIL:
      return {
        ...state,
        friendListWait: false,
        error: action.error,
      };
    case FRIENDINFO_SUCESS:
      return {
        ...state,
        friendListWait: false,
        friendInfo: action.payload,
      };
    default:
      return state;
  }
}
