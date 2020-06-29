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
    let {
      friends_list,
      block_list,
      pending_requests,
      pending_approvals,
    } = this.props.userDetails;

    console.log(allFriends);

    return (
      <div className="chatLeftPanel">
        <UserInfo />
        <FriendOptions />
        <div className="friendsList">
          {allFriends.map((friend) => {
            if (block_list.includes(friend.userName)) {
              //blocked friend
              return (
                <FriendListItem
                  user={friend}
                  type="Blocked"
                  key={friend.userName}
                />
              );
            } else if (pending_approvals.includes(friend.userName)) {
              //pending approvals
              return (
                <FriendListItem
                  user={friend}
                  type="PendingApproval"
                  key={friend.userName}
                />
              );
            } else if (pending_requests.includes(friend.userName)) {
              //pending requests active and inactive
              return onlineFriends.includes(friend.userName) ? (
                <FriendListItem
                  user={friend}
                  type="ActiveRequest"
                  key={friend.userName}
                />
              ) : (
                <FriendListItem
                  user={friend}
                  type="InActiveRequest"
                  key={friend.userName}
                />
              );
            } else if (friends_list.includes(friend.userName)) {
              console.log("awd");
              //friends active and inactive
              return onlineFriends.includes(friend.userName) ? (
                <FriendListItem
                  user={friend}
                  type="ActiveFriend"
                  key={friend.userName}
                />
              ) : (
                <FriendListItem
                  user={friend}
                  type="InActiveFriend"
                  key={friend.userName}
                />
              );
            } else {
              return (
                <div>
                  <span> suckit </span>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userDetails: state.loginData.userDetails,
  socket: state.socketData.socket,
  friendsInfo: state.chatPageData.friendsInfo,
});

export default connect(mapStateToProps, {
  getFriendInfo,
  friendConnected,
  friendDisconnected,
})(LeftPanel);
