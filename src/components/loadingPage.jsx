import React, { Component } from "react";
import { connect } from "react-redux";

import {
  preCheck,
  preCheckSucess,
  preCheckFail,
} from "../actions/precheckActions";

class ChatMain extends Component {
  state = {};

  handleSucess = () => {
    this.props.preCheckSucess();
  };

  handleFail = () => {
    this.props.preCheckFail();
  };

  componentDidMount = () => {
    this.props.preCheck();
  };
  render() {
    return (
      <div className="chatMain">
        <span>Loading....</span>
        <button onClick={this.handleSucess}>Sucess</button>
        <button onClick={this.handleFail}>Fail</button>
      </div>
    );
  }
}

export default connect(null, { preCheckSucess, preCheckFail, preCheck })(
  ChatMain
);
