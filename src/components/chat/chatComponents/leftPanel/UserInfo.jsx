import React, { Component } from "react";

import { connect } from "react-redux";

class UserInfo extends Component {
  state = {};
  render() {
    const { userDetails } = this.props;
    return (
      <div className="userInfo">
        <div
          className="profilePic"
          style={{
            backgroundImage: `url(${
              userDetails.profilePic
                ? userDetails.profilePic.url
                : process.env.PUBLIC_URL + "/defaultUserIcon.png"
            })`,
          }}
        />
        <div className="userName-container">
          <span className="userName-big">{userDetails.userName}</span>
          <br />
          <span className="userinfo-small">{userDetails.smallInfo}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userDetails: state.loginData.userDetails,
});

export default connect(mapStateToProps, null)(UserInfo);
