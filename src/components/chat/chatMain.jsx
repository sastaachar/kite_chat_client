import React, { Component } from "react";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/logoutActions";
class ChatMain extends Component {
  state = {};
  render() {
    const { userName } = this.props.userDetails;
    return (
      <div className="chatMain">
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
