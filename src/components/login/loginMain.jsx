import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loginUser } from "../../actions/loginActions";

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
            <img src={`${process.env.PUBLIC_URL}/kiteChatLogo.png`} alt="" />
          </div>
          <div className="girlPic">
            <img src={`${process.env.PUBLIC_URL}/girlChat.png`} alt="" />
          </div>
        </div>
        <div className="rightBox">
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
              <a href="/">Forgot password?</a>
            </div>
            <div className="signupUrl">
              <span>Don't have an account?</span>
              <a href="/">Signup</a>
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
