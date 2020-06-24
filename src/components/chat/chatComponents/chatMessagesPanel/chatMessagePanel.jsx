import React, { Component } from "react";
import { connect } from "react-redux";

import { sendMessage } from "../../../../actions/chatPageActions";

import "./chatMessagesPart.css";
import SendBtn from "../../../misc/sendBtn.svg";

class ChatMessagePanel extends Component {
  state = {
    message: "",
  };
  handleSend = (e) => {
    if (this.state.message && this.props.selectedFriend) {
      let message = {
        sender: this.props.userName,
        receiver: this.props.selectedFriend,
        content: {
          text: this.state.message,
          type: 1,
          timestamp: Date.now(),
        },
      };
      this.props.socket.emit("SEND_MESSAGE", message);
      this.props.sendMessage(message);
    }
  };
  handleChange = (e) => {
    //user is typing
    this.setState({ message: e.target.innerText });
  };
  render() {
    const { messages, selectedFriend } = this.props;
    return (
      <div className="chatMessagesPanel">
        <div className="sendMessageBox">
          <div className="chatType">choose</div>
          <div className="chatInputContainer">
            <div
              onInput={this.handleChange}
              className="chatInput"
              contentEditable="true"
            ></div>
          </div>
          <div className="sendBtn">
            <img onClick={this.handleSend} src={SendBtn} alt="" />
          </div>
        </div>
        <div className="chatMessageContainer">
          {messages[selectedFriend] ? (
            messages[selectedFriend].map((msg) => (
              <span key={msg.timestamp}>{msg.text}</span>
            ))
          ) : (
            <span>no msg</span>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginData.userDetails.userName,
  messages: state.chatPageData.messages,
  selectedFriend: state.chatPageData.selectedFriend,
  socket: state.socketData.socket,
});

export default connect(mapStateToProps, { sendMessage })(ChatMessagePanel);
