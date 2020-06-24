import {
  FRIENDINFO_REQUEST,
  FRIENDINFO_FAIL,
  FRIENDINFO_SUCESS,
  FIREND_DISCONNECTED,
  FIREND_CONNECTED,
  FIREND_SELECTED,
  RECV_MESSAGE,
  SEND_MESSAGE,
} from "../actions/types";

const initialState = {
  friendListWait: false,
  friendsInfo: { allFriends: [], onlineFriends: [] },
  selectedFriend: "",
  error: "",
  messages: {},
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
            (userName) => userName !== action.payload
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
    case FIREND_SELECTED:
      return {
        ...state,
        selectedFriend: action.payload,
      };
    case SEND_MESSAGE:
      let message = action.payload;
      //add send = true to identify it was a send msg
      message.content.sentMsg = true;
      message.sender = message.receiver;
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.sender]: [
            ...(state.messages[action.payload.sender] || []),
            message.content,
          ],
        },
      };
    case RECV_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.sender]: [
            ...(state.messages[action.payload.sender] || []),
            action.payload.content,
          ],
        },
      };
    default:
      return state;
  }
}
