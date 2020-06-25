import React, { Component } from "react";
import { connect } from "react-redux";

import { sendMessage } from "../../../../actions/chatPageActions";

import "./chatMessagesPart.css";
import SendBtn from "../../../misc/sendBtn.svg";
import MessageBox from "./messageBox";

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
      //this is a bit wierd cauase i am using a editable div
      this.setState({ message: "" });
      document.getElementById("chatMessage").innerText = "";
    }
  };
  handleChange = (e) => {
    //user is typing
    this.setState({ message: e.target.innerText });
  };
  render() {
    const { messages, selectedFriend, allFriends, selfUrl } = this.props;
    const user = allFriends.filter((ele) => ele.userName === selectedFriend)[0];
    return (
      // the divs are placed in an inverted manner to make them stick at bottom by using coloumn-reverse
      <div className="chatMessagesPanel">
        <div className="sendMessageBox">
          <div className="chatType">choose</div>
          <div className="chatInputContainer">
            <div
              id="chatMessage"
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
            messages[selectedFriend].map((content) => (
              <MessageBox
                content={content}
                key={content.timestamp}
                imageUrl={
                  content.sentMsg
                    ? selfUrl.url
                      ? selfUrl.url
                      : process.env.PUBLIC_URL + "/defaultUserIcon.png"
                    : user.profilePic
                    ? user.profilePic.url
                    : process.env.PUBLIC_URL + "/defaultUserIcon.png"
                }
                sentMsg={content.sentMsg}
              />
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
  selfUrl: state.loginData.userDetails.profilePic,
  userName: state.loginData.userDetails.userName,
  allFriends: state.chatPageData.friendsInfo.allFriends,
  messages: state.chatPageData.messages,
  selectedFriend: state.chatPageData.selectedFriend,
  socket: state.socketData.socket,
});

export default connect(mapStateToProps, { sendMessage })(ChatMessagePanel);
