import React, { Component } from "react";
import { connect } from "react-redux";

import UserInfo from "./UserInfo";
import FriendOptions from "./FriendOptions";
import FriendListItem from "./friendListItem";

import {
  getFriendInfo,
  friendConnected,
  friendDisconnected,
} from "../../../../actions/chatPageActions";

import "./leftPartPanel.css";

class LeftPanel extends Component {
  state = {};
  componentDidMount() {
    //get list of friends
    this.props.getFriendInfo(this.props.socket);
    this.props.socket.on("friendConnected", ({ userName }) => {
      this.props.friendConnected(userName);
    });
    this.props.socket.on("friendDisconnected", ({ userName }) => {
      this.props.friendDisconnected(userName);
    });
  }
  render() {
    const { allFriends, onlineFriends } = this.props.friendsInfo;

    return (
      <div className="chatLeftPanel">
        <UserInfo />
        <FriendOptions />
        <div className="friendsList">
          {allFriends.map((friend) =>
            onlineFriends.includes(friend.userName) ? (
              <FriendListItem user={friend} status="active" />
            ) : (
              <FriendListItem user={friend} status="inactive" />
            )
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  socket: state.socketData.socket,
  friendsInfo: state.chatPageData.friendsInfo,
});

export default connect(mapStateToProps, {
  getFriendInfo,
  friendConnected,
  friendDisconnected,
})(LeftPanel);
