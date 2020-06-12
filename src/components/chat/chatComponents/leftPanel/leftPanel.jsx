import React, { Component } from "react";

import UserInfo from "./UserInfo";

import "./leftPartPanel.css";

class LeftPanel extends Component {
  state = {};
  render() {
    return (
      <div className="chatLeftPanel">
        <UserInfo />
        <div>part2</div>
        <div>part3</div>
      </div>
    );
  }
}

export default LeftPanel;
