import React, { Component } from "react";

import { Link } from "react-router-dom";

class InputBox extends Component {
  state = {};
  render() {
    return (
      <div className="loginBox">
        <form>
          <div className="inputFld">
            <label htmlFor="userName">Username</label>
            <br />
            <input
              type="text"
              id="userName"
              name="formUserName"
              onChange={this.handleFormChange}
            />
          </div>
          <div className="inputFld">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="text"
              id="password"
              name="formPassword"
              onChange={this.handleFormChange}
            />
          </div>
        </form>
        <button className="loginBtn" onClick={this.handleLogin}>
          <span>LOGIN</span>
        </button>
        <div className="forgotUrl">
          <Link to="/password/reset">Forgot password?</Link>
        </div>
        <div className="signupUrl">
          <span>Don't have an account?</span>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    );
  }
}

export default InputBox;
