import { SOCKETCON_SUCESS, SOCKETCON_FAIL } from "../actions/types";

const initialState = {
  signupSucess: false,
  loading: false,
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SOCKETCON_SUCESS:
      return {
        ...state,
        socket: action.payload,
        error: "",
      };
    case SOCKETCON_FAIL:
      return {
        ...state,
        error: "Already Connected",
      };

    default:
      return state;
  }
}
