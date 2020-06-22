import React, { Component } from "react";
import { connect } from "react-redux";

import LeftPanel from "./chatComponents/leftPanel/leftPanel";
import ChatMessagePanel from "./chatComponents/chatMessagesPanel/chatMessagePanel";
import RightPanel from "./chatComponents/rightPanel/rightPanel";
import AlreadyConnected from "../parts/alreadyConected";

import { socketioConnection } from "../../actions/socketioActions";

import "./chatPage.css";

class ChatMain extends Component {
  state = {};

  componentWillMount() {
    //call the socketioConnection here
    //connect to scoket
    this.props.socketioConnection(this.props.jwtToken);
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
    ) : (
      <AlreadyConnected />
    );
  }
}
const mapStateToProps = (state) => ({
  socket: state.socketData.socket,
  socketConnected: state.socketData.socketConnected,
  jwtToken: state.loginData.userDetails.jwtToken,
});

export default connect(mapStateToProps, { socketioConnection })(ChatMain);
