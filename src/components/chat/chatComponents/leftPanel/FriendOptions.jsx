import React, { Component } from "react";

class FriendOptions extends Component {
  state = {};
  // <li>&#9662;</li>
  render() {
    return (
      <div className="friendOptions">
        <div className="addFriend">
          <div>
            <input type="text" />
          </div>
          <span>&#43;</span>
        </div>
        <div className="friendListTypeContainer">
          <select name="listTypes" id="listType">
            <option value="pendingReq">Pending Requests</option>
            <option value="onlineFrnds">Online Friends</option>
            <option value="offlineFrnds">Offline Friends</option>
            <option value="allFrnds">All Friends</option>
          </select>
        </div>
      </div>
    );
  }
}

export default FriendOptions;
