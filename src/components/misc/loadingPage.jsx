import React, { Component } from "react";
import { connect } from "react-redux";

import { preCheck } from "../../actions/precheckActions";

class ChatMain extends Component {
  state = {};

  componentDidMount = () => {
    this.props.preCheck();
  };
  render() {
    return (
      <div className="chatMain">
        <span>Loading....</span>
      </div>
    );
  }
}

export default connect(null, { preCheck })(ChatMain);
