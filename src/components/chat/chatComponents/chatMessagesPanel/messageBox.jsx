import React from "react";

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
        <span className="message-timestamp">{content.timestamp}</span>
      </div>
    </div>
  );
};

export default MessageBox;
