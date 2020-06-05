import React, { Component } from "react";
import { connect } from "react-redux";

import "./chatPage.css";

import { logoutUser } from "../../actions/logoutActions";
class ChatMain extends Component {
  state = {
    sendTo: "",
  };
  render() {
    const { userName } = this.props.userDetails;
    return (
      <div
        className="chatMain"
        style={{
          background: `url(${process.env.PUBLIC_URL}/chatPagedemo.png)`,
        }}
      ></div>
    );
  }
}

const mapStateToProps = (state) => ({
  userDetails: state.loginData.userDetails,
});

export default connect(mapStateToProps, { logoutUser })(ChatMain);
