import React from "react";
import Moment from "moment";

const MessageBox = (props) => {
  const { content, imageUrl } = props;
  let msgContainerClass = "messageContainer";
  if (content.sentMsg) {
    msgContainerClass += " sentMsg";
  }
  return (
    <div className={msgContainerClass}>
      <div
        className="profilePic picSmall"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="messageBox">
        <span className="message-text">{content.text}</span>
        <span className="message-timestamp">
          {Moment(content.timestamp).format("D MMMM , h:m A")}
        </span>
      </div>
    </div>
  );
};

export default MessageBox;
