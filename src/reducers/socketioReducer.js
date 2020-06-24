import {
  SOCKETCON_SUCESS,
  SOCKETCON_FAIL,
  SOCKETCON_REQUEST,
} from "../actions/types";

const initialState = {
  signupSucess: false,
  loading: false,
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SOCKETCON_REQUEST:
      return {
        ...state,
        waitForSocket: true,
        socketConnected: false,
        error: "",
      };
    case SOCKETCON_SUCESS:
      return {
        ...state,
        waitForSocket: false,
        socketConnected: true,
        socket: action.payload,
        error: "",
      };
    case SOCKETCON_FAIL:
      return {
        ...state,
        waitForSocket: false,
        socketConnected: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
