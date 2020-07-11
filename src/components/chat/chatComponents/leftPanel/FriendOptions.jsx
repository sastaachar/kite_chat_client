import React, { Component } from "react";
import { connect } from "react-redux";

import {
  sendRequest,
  updateUserDetails,
} from "../../../../actions/chatPageActions";

class FriendOptions extends Component {
  state = {
    addFriend: "",
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddFriend = (e) => {
    const { userName, socket } = this.props;
    if (this.state.addFriend)
      this.props.sendRequest(userName, this.state.addFriend, socket);
  };

  render() {
    return (
      <div className="friendOptions">
        <div className="addFriend">
          <div className="addFrnd-input-container">
            <input
              name="addFriend"
              value={this.state.addFriend}
              onChange={this.handleOnChange}
              type="text"
            />
          </div>
          <div className="addBtn" onClick={this.handleAddFriend} />
        </div>
        <div className="friendListTypeContainer">
          <select name="listTypes" id="listType">
            <option value="pendingReq">Pending Requests</option>
            <option value="onlineFrnds">Online Friends</option>
            <option value="offlineFrnds">Offline Friends</option>
            <option value="allFrnds">All Friends</option>
          </select>
          <div
            className={this.props.loading ? "reloadBtn spin" : "reloadBtn "}
            onClick={() => this.props.updateUserDetails(this.props.socket)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loginData.userDataLoading,
  userName: state.loginData.userDetails.userName,
  socket: state.socketData.socket,
});

export default connect(mapStateToProps, { sendRequest, updateUserDetails })(
  FriendOptions
);
