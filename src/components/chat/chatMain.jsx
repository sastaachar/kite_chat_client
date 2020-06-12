import React, { Component } from "react";
import { connect } from "react-redux";

import LeftPanel from "./chatComponents/leftPanel/leftPanel";
import ChatMessages from "./chatComponents/chatMessagesPanel/chatMessages";
import RightPanel from "./chatComponents/rightPanel/rightPanel";

import "./chatPage.css";

class ChatMain extends Component {
  state = {};
  render() {
    return (
      <div className="chatMain">
        <LeftPanel />
        <ChatMessages />
        <RightPanel />
      </div>
    );
  }
}

export default connect(null, null)(ChatMain);
