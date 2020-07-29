import React from "react";
import { connect } from "react-redux";

import "./rightPartPanel.css";

import { logoutUser } from "../../../../actions/logoutActions";

const RightPanel = (props) => {
  const { allFriends, selectedFriend, logoutUser } = props;
  const user = allFriends.filter((ele) => ele.userName === selectedFriend)[0];

  return (
    <div className="chatRightPanel">
      <div className="logoutBox">
        <span onClick={logoutUser}>Logout</span>
      </div>
      {user ? (
        <div className="firendInfoBIg">
          <div
            className="profilePic picBig"
            style={{
              backgroundImage: `url(${
                user.profilePic && user.profilePic.url
                  ? user.profilePic.url
                  : process.env.PUBLIC_URL + "/defaultUserIcon.svg"
              })`,
            }}
          />
          <span className="userName-big">{user.userName}</span>

          <div className="textInfo">
            <p>
              <span className="highLight">Status : </span>
              <span>{user.smallInfo}</span>
            </p>
            <p>
              <span className="highLight">About me : </span>
              <span>{user.largeInfo}</span>
            </p>
          </div>
        </div>
      ) : (
        <span>Select a user to Chat</span>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedFriend: state.chatPageData.selectedFriend,
  allFriends: state.chatPageData.friendsInfo.allFriends,
});

export default connect(mapStateToProps, { logoutUser })(RightPanel);
