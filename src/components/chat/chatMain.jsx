import React, { Component } from "react";
import { connect } from "react-redux";

import LeftPanel from "./chatComponents/leftPanel/leftPanel";
import ChatMessagePanel from "./chatComponents/chatMessagesPanel/chatMessagePanel";
import RightPanel from "./chatComponents/rightPanel/rightPanel";
import { socketioConnection } from "../../actions/socketioActions";
import { getFriendInfo } from "../../actions/chatPageActions";
import "./chatPage.css";

class ChatMain extends Component {
  state = {};

  componentWillMount() {
    //call the socketioConnection here
    //connect to scoket
    this.props.socketioConnection(this.props.jwtToken);
  }

  componentDidMount() {
    //get list of friends
    this.props.getFriendInfo();
  }

  componentWillUnmount() {
    //disconnect pls
    if (this.props.socket) this.props.socket.disconnect();
  }

  render() {
    return this.props.socketConnected ? (
      <div className="chatMain">
        <LeftPanel />
        <ChatMessagePanel />
        <RightPanel />
      </div>
    ) : null;
  }
}
const mapStateToProps = (state) => ({
  friendList: state.loginData.userDetails.friends_list,
  socket: state.socketData.socket,
  socketConnected: state.socketData.socketConnected,
  jwtToken: state.loginData.userDetails.jwtToken,
});

export default connect(mapStateToProps, { socketioConnection, getFriendInfo })(
  ChatMain
);
