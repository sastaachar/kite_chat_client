import React, { Component } from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

class MainPage extends Component {
  state = {};

  render() {
    return (
      <div>
        <Link to="/signup">signup</Link>
        <Link to="/login">login</Link>
      </div>
    );
  }
}

export default connect(null, null)(MainPage);
