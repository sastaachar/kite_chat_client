import React, { Component } from "react";
import { connect } from "react-redux";

import { preCheckSucess, preCheckFail } from "../actions/precheckActions";

class ChatMain extends Component {
  state = {};

  handleSucess = () => {
    this.props.preCheckSucess();
  };

  handleFail = () => {
    this.props.preCheckFail();
  };

  render() {
    return (
      <div className="chatMain">
        <span>Loadin....</span>
        <button onClick={this.handleSucess}>Sucess</button>
        <button onClick={this.handleFail}>Fail</button>
      </div>
    );
  }
}

export default connect(null, { preCheckSucess, preCheckFail })(ChatMain);
