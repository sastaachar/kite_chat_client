import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loginUser } from "../actions/loginActions";

class LoginMain extends Component {
  state = {};
  render() {
    return (
      <div className="loginMain">
        <span>Login here</span>
      </div>
    );
  }
}

export default connect(null, { loginUser })(LoginMain);
