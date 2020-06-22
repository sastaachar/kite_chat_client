import React from "react";

const FriendListItem = ({ user, status }) => {
  return status === "active" ? (
    <div className="active-friend">
      {user.userName}
      {user.profilePic ? (
        <div
          style={{ backgroundImage: `url(${user.profilePic.url})` }}
          className="profilePic"
        />
      ) : null}
    </div>
  ) : (
    <div className="inactive-friend">
      {user.userName}
      {user.profilePic ? (
        <div
          style={{ backgroundImage: `url(${user.profilePic.url})` }}
          className="profilePic"
        />
      ) : null}
    </div>
  );
};

export default FriendListItem;
