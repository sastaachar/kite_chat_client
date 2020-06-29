import React, { Component } from "react";
import { connect } from "react-redux";

import Cross from "../../../misc/svgs/addSign.svg";

import { sendRequest } from "../../../../actions/chatPageActions";

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
          <div>
            <input
              name="addFriend"
              value={this.state.addFriend}
              onChange={this.handleOnChange}
              type="text"
            />
          </div>
          <img onClick={this.handleAddFriend} src={Cross} alt="" />
        </div>
        <div className="friendListTypeContainer">
          <select name="listTypes" id="listType">
            <option value="pendingReq">Pending Requests</option>
            <option value="onlineFrnds">Online Friends</option>
            <option value="offlineFrnds">Offline Friends</option>
            <option value="allFrnds">All Friends</option>
          </select>
          <span className="reloadBtn">&#x21BA;</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginData.userDetails.userName,
  socket: state.socketData.socket,
});

export default connect(mapStateToProps, { sendRequest })(FriendOptions);
