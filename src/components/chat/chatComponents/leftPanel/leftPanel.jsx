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
  state = {
    listType: "allFriends",
  };

  setListType = (listType) => {
    this.setState({ listType });
  };

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

    const { listType } = this.state;

    return (
      <div className="chatLeftPanel">
        <UserInfo />
        <FriendOptions setListType={this.setListType} />
        <div className="friendsList">
          {allFriends.map((friend) => {
            if (
              block_list.includes(friend.userName) &&
              (listType === "allFriends" || listType === "blockedFriends")
            ) {
              //blocked friend
              return (
                <FriendListItem
                  friend={friend}
                  type="Blocked"
                  key={friend.userName}
                />
              );
            } else if (
              pending_approvals.includes(friend.userName) &&
              (listType === "allFriends" || listType === "pendingApprovals")
            ) {
              //pending approvals
              return (
                <FriendListItem
                  friend={friend}
                  type="PendingApproval"
                  key={friend.userName}
                />
              );
            } else if (
              pending_requests.includes(friend.userName) &&
              (listType === "allFriends" || listType === "pendingRequests")
            ) {
              //pending requests active and inactive
              return onlineFriends.includes(friend.userName) ? (
                <FriendListItem
                  friend={friend}
                  type="ActiveRequest"
                  key={friend.userName}
                />
              ) : (
                <FriendListItem
                  friend={friend}
                  type="InActiveRequest"
                  key={friend.userName}
                />
              );
            } else if (
              friends_list.includes(friend.userName) &&
              onlineFriends.includes(friend.userName) &&
              (listType === "allFriends" || listType === "onlineFriends")
            ) {
              //friends active and inactive
              return (
                <FriendListItem
                  friend={friend}
                  type="ActiveFriend"
                  key={friend.userName}
                />
              );
            } else if (
              friends_list.includes(friend.userName) &&
              !onlineFriends.includes(friend.userName) &&
              (listType === "allFriends" || listType === "offlineFriends")
            ) {
              return (
                <FriendListItem
                  friend={friend}
                  type="InActiveFriend"
                  key={friend.userName}
                />
              );
            } else {
              return null;
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
