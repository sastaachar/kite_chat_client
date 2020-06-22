import {
  FRIENDINFO_REQUEST,
  FRIENDINFO_FAIL,
  FRIENDINFO_SUCESS,
  FIREND_DISCONNECTED,
  FIREND_CONNECTED,
} from "../actions/types";

const initialState = {
  friendListWait: false,
  friendsInfo: { allFriends: [], onlineFriends: [] },
  error: "",
};

export default function (state = initialState, action) {
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
        friendsInfo: action.payload,
      };
    case FIREND_DISCONNECTED:
      return {
        ...state,
        friendsInfo: {
          ...state.friendsInfo,
          onlineFriends: state.friendsInfo.onlineFriends.filter(
            (userName) => userName != action.payload
          ),
        },
      };
    case FIREND_CONNECTED:
      return {
        ...state,
        friendsInfo: {
          ...state.friendsInfo,
          onlineFriends: [...state.friendsInfo.onlineFriends, action.payload],
        },
      };
    default:
      return state;
  }
}
