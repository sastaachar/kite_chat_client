import React from "react";
import { connect } from "react-redux";

import {
  selectFriend,
  sendRequest,
  respondRequest,
} from "../../../../actions/chatPageActions";

//types of friendList Item
//                     Methods                            Profile
//active friend          [selectFriend]                     +
//inactive friend        [-]                                +
//pending Requests       [respondRequest]        +
//pending approvals      [cancelRequest]                    -
//blocked friends        [-]                                -

const FriendListItem = (props) => {
  const { user, type } = props;

  //imediately invoked function
  return (() => {
    switch (type) {
      case "ActiveFriend":
        return (
          <div
            className={
              props.selectedFriend === user.userName
                ? "friendItem active selected"
                : "friendItem active"
            }
            onClick={() => props.selectFriend(user.userName)}
          >
            <div
              style={{
                backgroundImage: `url(${
                  user.profilePic
                    ? user.profilePic.url
                    : process.env.PUBLIC_URL + "/defaultUserIcon.png"
                })`,
              }}
              className="profilePic small"
            />
            <div className="friendInfo">
              <span className="userName-big">{user.userName}</span>
              {user.smallInfo}
            </div>
          </div>
        );
      case "InActiveFriend":
        return (
          <div className="friendItem inactive">
            <div
              style={{
                backgroundImage: `url(${
                  user.profilePic
                    ? user.profilePic.url
                    : process.env.PUBLIC_URL + "/defaultUserIcon.png"
                })`,
              }}
              className="profilePic small"
            />
            <div className="friendInfo">
              <span className="userName-big">{user.userName}</span>
              {user.smallInfo}
            </div>
          </div>
        );
      case "ActiveRequest":
        return (
          <div
            className={
              props.selectedFriend === user.userName
                ? "friendItem active selected"
                : "friendItem active"
            }
          >
            <div
              style={{
                backgroundImage: `url(${
                  user.profilePic
                    ? user.profilePic.url
                    : process.env.PUBLIC_URL + "/defaultUserIcon.png"
                })`,
              }}
              className="profilePic small"
            />
            <div className="friendInfo">
              <span className="userName-big">{user.userName}</span>accept - deny
              {user.smallInfo}
            </div>
          </div>
        );
      case "InActiveRequest":
        return (
          <div
            className={
              props.selectedFriend === user.userName
                ? "friendItem active selected"
                : "friendItem active"
            }
          >
            <div
              style={{
                backgroundImage: `url(${
                  user.profilePic
                    ? user.profilePic.url
                    : process.env.PUBLIC_URL + "/defaultUserIcon.png"
                })`,
              }}
              className="profilePic small"
            />
            <div className="friendInfo">
              <span className="userName-big">{user.userName}</span>
              {user.smallInfo}
            </div>
          </div>
        );
      default:
        return null;
    }
  })();
};

const mapStateToProps = (state) => ({
  selectedFriend: state.chatPageData.selectedFriend,
});

export default connect(mapStateToProps, { selectFriend })(FriendListItem);
