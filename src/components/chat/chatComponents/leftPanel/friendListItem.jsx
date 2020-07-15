import React, { useState } from "react";
import { connect } from "react-redux";

import {
  selectFriend,
  cancelRequest,
  removeFriend,
  respondRequest,
} from "../../../../actions/chatPageActions";

import ContextMenu from "../contextMenu/contextMenu";

// types of friendList Item
// Type                   Description              Methods                       Profile
// ActiveFriend           active friend            [selectFriend,removeFriend]      +
// InActiveFriend         inactive friend          [removeFriend]                   +
// (In?)ActiveRequest     pending Requests(A,I)    [respondRequest]                 +
// PendingApproval        pending approvals        [cancelRequest]                  -
// BlockedFriend          blocked friends          [-]                              -
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

  const [pos, setPos] = useState([0, 0]);
  const [visible, setVisible] = useState(false);

  const handleContextMenu = (event, friend) => {
    event.preventDefault();
    console.log("hi", friend);
    console.log();
    setPos([event.clientX, event.clientY]);
    setVisible(true);
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
            onContextMenu={(event) => handleContextMenu(event, friend.userName)}
          >
            <ContextMenu />
            <MiniProfilePic friend={friend} />
            <UserInfoText
              userName={friend.userName}
              smallInfo={friend.smallInfo}
            />
          </div>
        );
      //offline friend
      case "InActiveFriend":
        return (
          <div className="friendItem inactive">
            <MiniProfilePic friend={friend} />
            <UserInfoText
              userName={friend.userName}
              smallInfo={friend.smallInfo}
            />
          </div>
        );
      //this is a fallthrough cause for now i dont need the InActiveReq format
      //offline friend request
      case "InActiveRequest":
      //online request
      case "ActiveRequest":
        return (
          <div
            className="friendItem inactive"
            onContextMenu={(event) => handleContextMenu(event, friend.userName)}
          >
            <MiniProfilePic friend={friend} />
            <UserInfoText
              userName={friend.userName}
              smallInfo={friend.smallInfo}
            />
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
                  respondRequest(self_userName, friend.userName, false, socket)
                }
              />
            </div>
          </div>
        );
      case "PendingApproval":
        return (
          <div className="friendItem inactive">
            <MiniProfilePic friend={friend} />
            <UserInfoText
              userName={friend.userName}
              smallInfo="Pending Approval"
            />
            <div className="BtnContainer">
              <div
                className="crossBtn"
                onClick={(event) => {
                  event.stopPropagation();
                  props.cancelRequest(self_userName, friend.userName, socket);
                }}
              />
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

const UserInfoText = ({ userName, smallInfo }) => {
  return (
    <div className="friendInfo">
      <span className="userName-big">{userName}</span>
      <span>{smallInfo}</span>
    </div>
  );
};

const MiniProfilePic = ({ friend }) => {
  const DEFAULT_IMAGE = process.env.PUBLIC_URL + "/defaultUserIcon.svg";

  return (
    <div
      style={{
        backgroundImage: `url(${
          friend.profilePic && friend.profilePic.url
            ? friend.profilePic.url
            : DEFAULT_IMAGE
        })`,
      }}
      className="profilePic small"
    />
  );
};

export default connect(mapStateToProps, {
  selectFriend,
  respondRequest,
  removeFriend,
  cancelRequest,
})(FriendListItem);
