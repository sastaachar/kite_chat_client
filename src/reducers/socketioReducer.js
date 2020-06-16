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
        error: "",
      };
    case SOCKETCON_SUCESS:
      return {
        ...state,
        waitForSocket: false,
        socket: action.payload,
        error: "",
      };
    case SOCKETCON_FAIL:
      return {
        ...state,
        waitForSocket: false,
        error: "Already Connected",
      };

    default:
      return state;
  }
}
