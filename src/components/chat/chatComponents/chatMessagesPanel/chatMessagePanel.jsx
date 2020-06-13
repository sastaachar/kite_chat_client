import React, { Component } from "react";

import "./chatMessagesPart.css";

class ChatMessagePanel extends Component {
  state = {};
  render() {
    return (
      <div className="chatMessagesPanel">
        <div className="sendMessageBox">
          <div className="chatInputContainer">
            <div className="chatInput" contentEditable="true"></div>
          </div>
        </div>
        <div className="chatMessageContainer">hi hello</div>
      </div>
    );
  }
}

export default ChatMessagePanel;
