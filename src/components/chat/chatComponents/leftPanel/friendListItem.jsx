import React from "react";
import { connect } from "react-redux";

import {
  selectFriend,
  sendRequest,
  removeFriend,
  respondRequest,
} from "../../../../actions/chatPageActions";

//types of friendList Item
//                       Methods                            Profile
//active friend          [selectFriend,removeFriend]                     +
//inactive friend        [removeFriend]                                +
//pending Requests(A,I)  [respondRequest]        +
//pending approvals      [cancelRequest]                    -
//blocked friends        [-]                                -
//*note (A,I) - active and inactive

const FriendListItem = (props) => {
  const {
    friend,
    type,
    respondRequest,
    self_userName,
    socket,
    removeFriend,
  } = props;

  const handleContextMenu = (event, friend) => {
    event.preventDefault();
    console.log("hi", friend);
  };

  //imediately invoked function
  return (() => {
    switch (type) {
      //this is for your online friend
      case "ActiveFriend":
        return (
          <div
            className={
              props.selectedFriend === friend.userName
                ? "friendItem active selected"
                : "friendItem active"
            }
            onClick={() => props.selectFriend(friend.userName)}
          >
            <div
              style={{
                backgroundImage: `url(${
                  friend.profilePic
                    ? friend.profilePic.url
                    : process.env.PUBLIC_URL + "/defaultUserIcon.png"
                })`,
              }}
              className="profilePic small"
            />
            <div className="friendInfo">
              <span className="userName-big">{friend.userName}</span>
              <span>{friend.smallInfo}</span>
            </div>
            <div
              className="crossBtn"
              onClick={(event) => {
                event.stopPropagation();
                removeFriend(self_userName, friend.userName, socket);
              }}
            />
          </div>
        );

      //this is a fallthrough cause for now i dont need the InActiveReq format
      //offline friend request
      case "InActiveFriend":
      //online request
      case "ActiveRequest":
        return (
          <div
            className={
              props.selectedFriend === friend.userName
                ? "friendItem active selected"
                : "friendItem active"
            }
            onContextMenu={(event) => handleContextMenu(event, friend.userName)}
          >
            <div
              style={{
                backgroundImage: `url(${
                  friend.profilePic
                    ? friend.profilePic.url
                    : process.env.PUBLIC_URL + "/defaultUserIcon.png"
                })`,
              }}
              className="profilePic small"
            />
            <div className="friendInfo">
              <span className="userName-big">{friend.userName}</span>
              <div className="BtnContainer">
                <div
                  className="addBtn"
                  onClick={() =>
                    respondRequest(self_userName, friend.userName, true, socket)
                  }
                />
                <div
                  className="crossBtn"
                  onClick={() =>
                    respondRequest(
                      self_userName,
                      friend.userName,
                      false,
                      socket
                    )
                  }
                />
              </div>
              <span>{friend.smallInfo}</span>
            </div>
          </div>
        );
      //request offilne
      case "InActiveRequest":
        return (
          <div
            className={
              props.selectedFriend === friend.userName
                ? "friendItem active selected"
                : "friendItem active"
            }
          >
            <div
              style={{
                backgroundImage: `url(${
                  friend.profilePic
                    ? friend.profilePic.url
                    : process.env.PUBLIC_URL + "/defaultUserIcon.png"
                })`,
              }}
              className="profilePic small"
            />
            <div className="friendInfo">
              <span className="userName-big">{friend.userName}</span>
              <span>{friend.smallInfo}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  })();
};

const mapStateToProps = (state) => ({
  self_userName: state.loginData.userDetails.userName,
  selectedFriend: state.chatPageData.selectedFriend,
  socket: state.socketData.socket,
});

export default connect(mapStateToProps, {
  selectFriend,
  respondRequest,
  removeFriend,
})(FriendListItem);
