import React, { Component } from "react";

import Cross from "../../../misc/svgs/addSign.svg";

class FriendOptions extends Component {
  state = {};
  render() {
    return (
      <div className="friendOptions">
        <div className="addFriend">
          <div>
            <input type="text" />
          </div>
          <img src={Cross} alt="" />
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
