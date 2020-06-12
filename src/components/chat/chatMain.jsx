import React, { Component } from "react";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/logoutActions";

import LeftPanel from "./chatComponents/leftPanel";

class ChatMain extends Component {
  state = {};
  render() {
    const { userName } = this.props.userDetails;
    return (
      <div className="chatMain">
        <LeftPanel />
        <span>chat here</span>
        {userName}
        <button onClick={this.props.logoutUser}>LOGOUT</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userDetails: state.loginData.userDetails,
});

export default connect(mapStateToProps, { logoutUser })(ChatMain);
