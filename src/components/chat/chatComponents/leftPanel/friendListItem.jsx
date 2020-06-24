import React from "react";
import { connect } from "react-redux";

import { selectFriend } from "../../../../actions/chatPageActions";

const FriendListItem = (props) => {
  const { user, status } = props;

  return status === "active" ? (
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
  ) : (
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
};

const mapStateToProps = (state) => ({
  selectedFriend: state.chatPageData.selectedFriend,
});

export default connect(mapStateToProps, { selectFriend })(FriendListItem);
