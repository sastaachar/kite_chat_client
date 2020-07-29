import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { loginUser } from "../../actions/loginActions";
import TheGirl from "../misc/svgs/TheGirlChat.svg";
import UsernameIcon from "../misc/svgs/usernameIcon.svg";
import PasswordIcon from "../misc/svgs/passwordIcon.svg";
import sadIcon from "../misc/svgs/sadIcon.svg";

import "./loginPage.css";

class LoginMain extends Component {
  timer = null;

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

    //clear and set new
    clearTimeout(this.timer);
    setTimeout(() => {
      this.setState({ errorMsg: "" });
    }, 10000);
  };
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  formatError = (msg) => {
    if (msg === "Auth Error") return "Incorrect username or password !";
    else if (msg === "notVerified") return "Please verify your Email !";
    return null;
  };

  loginOnEnter = (e) => {
    if (e.key === "Enter") {
      this.handleLogin();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.loginOnEnter);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    document.removeEventListener("keydown", this.loginOnEnter);
  }

  render() {
    const errorMsg = this.formatError(this.props.errorMsg);
    return (
      <div className="dark1-container loginSignupMain">
        <img src={TheGirl} className="girlVector" alt="GirlChat Vector" />
        <div className="darkGradient-container loginSignupInputBox">
          {errorMsg ? (
            <div className="errorMessage">
              <img src={sadIcon} alt="error" />
              <span>{errorMsg}</span>
            </div>
          ) : null}

          <div className="inputContainer ">
            <img
              src={UsernameIcon}
              alt="username"
              className="inputIcon"
              id="userNameIcon"
            />
            <input
              type="text"
              placeholder="Username"
              name="formUserName"
              value={this.state.formUserName}
              onChange={this.handleFormChange}
            />
          </div>
          <div className="inputContainer ">
            <img
              src={PasswordIcon}
              alt="password"
              className="inputIcon"
              id="passwordIcon"
            />
            <input
              type="password"
              placeholder="Password"
              name="formPassword"
              value={this.state.formPassword}
              onChange={this.handleFormChange}
            />
          </div>
          <div className="callAction btn" onClick={this.handleLogin}>
            <span>LOGIN</span>
          </div>
          <div>
            <Link to="/password/reset" className="redirectUrl">
              Forgot password?
            </Link>
          </div>
          <div className="redirect-container">
            <span>Don't have an account?</span>
            <Link to="/signup" className="redirectUrl">
              Signup
            </Link>
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
  errorMsg: state.loginData.error,
});

export default connect(mapStateToProps, { loginUser })(LoginMain);
