import React, { Component } from "react";
import { connect } from "react-redux";

import "./rightPartPanel.css";

import { logoutUser } from "../../../../actions/logoutActions";

class RightPanel extends Component {
  state = {};
  render() {
    return (
      <div className="chatRightPanel">
        <div className="logoutBox">
          <span onClick={this.props.logoutUser}>Logout</span>
        </div>
        <div>part2</div>
        <div>part3</div>
      </div>
    );
  }
}

export default connect(null, { logoutUser })(RightPanel);
