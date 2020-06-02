import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { loginUser } from "../../actions/loginActions";
import TheGirl from "../misc/TheGirl";
import TheGuy from "../misc/TheGuy";
import Kite from "../misc/Kite";

import "./loginPage.css";

class LoginMain extends Component {
  state = {
    formEmail: "",
    formUserName: "",
    formPassword: "",
  };
  handleLogin = (e) => {
    let userData = {
      password: this.state.formPassword,
    };
    if (this.state.email) userData.email = this.state.formEmail;
    else userData.userName = this.state.formUserName;
    this.props.loginUser(userData);
  };
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="loginMain">
        <div className="leftBox">
          {this.props.loading ? <span>loading</span> : null}
          <div className="logoPic">
            <Kite></Kite>
          </div>
          <span className="logoName">kite Chat</span>
          <span className="logoTag">stay connected</span>

          <div className="girlPic">
            <TheGirl></TheGirl>
          </div>
        </div>
        <div className="rightBox">
          <div className="guyChat">
            <TheGuy></TheGuy>
          </div>
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
        </div>
      </div>
    );
  }
}

LoginMain.propTypes = {
  loading: PropTypes.bool,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loginData.loading,
});

export default connect(mapStateToProps, { loginUser })(LoginMain);
