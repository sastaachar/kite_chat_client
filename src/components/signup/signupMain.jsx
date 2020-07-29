import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { signupUser, signupReset } from "../../actions/signupActions";
import GirlSit from "../misc/svgs/girlSit.svg";
import GirlSitBackgorund from "../misc/svgs/girlSitBackground.svg";
import PasswordIcon from "../misc/svgs/passwordIcon.svg";
import EmailIcon from "../misc/svgs/emailIcon.svg";
import sadIcon from "../misc/svgs/sadIcon.svg";
import UsernameIcon from "../misc/svgs/usernameIcon.svg";
//import CloseEyes from "../misc/svgs/closeEyes.svg";

import "../login/loginPage.css";
import "./signupPage.css";

class SignupMain extends Component {
  timer = null;

  state = {
    formEmail: "",
    formUserName: "",
    formPassword: "",
    formConfirmPassword: "",
    userNamePlaceholder: "Username",
    errorMsg: "",
  };

  handleSubmit = async (e) => {
    this.setState({ errorMsg: "" });

    const {
      formEmail: email,
      formUserName: userName,
      formPassword: password,
      formConfirmPassword: confirmPass,
    } = this.state;

    let errorMsg = "";

    if (!userName) errorMsg = "Username cannot be empty !";
    else if (!email) errorMsg = "Email cannot be empty !";
    else if (!password) errorMsg = "Passsword cannot be empty !";
    else if (password !== confirmPass) errorMsg = "Passswords dont't match !";
    else {
      let userData = { userName, email, password };
      //call the signup method
      this.props.signupUser(userData);
      //if sucess redirect to the login page
    }

    //set clear remove
    this.setState({ errorMsg });
    // clear previous timeout and set newone
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ errorMsg: "" });
    }, 5000);
  };

  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  formatError = (msg) => {
    if (msg) {
      if (msg.includes("failed: email")) return "Invalid Email !";
      else if (msg.includes("failed: userName")) return "Invalid Username !";
      else if (
        msg.includes(
          "duplicate key error collection: Users.users index: userName"
        )
      ) {
        return "That username is taken !";
      } else if (
        msg.includes("duplicate key error collection: Users.users index: email")
      ) {
        return "That email is already registered !";
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({ errorMsg: "" });
      }, 5000);
    } else {
      return null;
    }
  };

  signupOnEnter = (e) => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.signupOnEnter);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    //if user signedin only then call this
    if (this.props.signupSucess) this.props.signupReset();
    document.removeEventListener("keydown", this.signupOnEnter);
  }

  render() {
    return (
      <div className="dark1-container loginSignupMain signupMain">
        <div
          className="splInput"
          style={{ backgroundImage: `url(${GirlSitBackgorund})` }}
        >
          <img src={GirlSit} id="girlSit" alt="GirlChat Vector" />
          <div className="inputAndTextWrapper">
            <div className="inputContainer">
              <img
                src={UsernameIcon}
                alt="username"
                className="inputIcon"
                id="userNameIcon"
              />

              <input
                placeholder={this.state.userNamePlaceholder}
                autoComplete="new-password"
                type="text"
                name="formUserName"
                value={this.state.formUserName}
                onChange={this.handleFormChange}
              />
            </div>
            <span>PICK A USERNAME</span>
          </div>
        </div>
        <div className="darkGradient-container loginSignupInputBox">
          {this.props.signupSucess ? (
            <span className="loginSucessMsg">
              Signup Sucess, Verify your Email !
            </span>
          ) : null}
          {this.state.errorMsg || this.formatError(this.props.signUpError) ? (
            <div className="errorMessage">
              <img src={sadIcon} alt="error" />
              <span>
                {this.state.errorMsg ||
                  this.formatError(this.props.signUpError)}
              </span>
            </div>
          ) : null}
          <div className="inputContainer onlyMobile">
            <img
              src={UsernameIcon}
              alt="username"
              className="inputIcon"
              id="userNameIcon"
            />
            <input
              autoComplete="new-password"
              type="text"
              placeholder="Username"
              name="formUserName"
              value={this.state.formUserName}
              onChange={this.handleFormChange}
            />
          </div>
          <div className="inputContainer ">
            <img
              src={EmailIcon}
              alt="email"
              className="inputIcon"
              id="userNameIcon"
            />
            <input
              autoComplete="new-password"
              type="text"
              placeholder="Email"
              name="formEmail"
              value={this.state.formEmail}
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
              autoComplete="new-password"
              type="password"
              placeholder="Password"
              name="formPassword"
              value={this.state.formPassword}
              onChange={this.handleFormChange}
            />
          </div>

          <div className="inputContainer">
            <img
              src={PasswordIcon}
              alt="ConrirmPassword"
              className="inputIcon"
              id="passwordIcon"
            />
            <input
              autoComplete="new-password"
              type="password"
              placeholder="Confirm Password"
              name="formConfirmPassword"
              value={this.state.formConfirmPassword}
              onChange={this.handleFormChange}
            />
          </div>

          <div className="callAction btn" onClick={this.handleSubmit}>
            <span>SIGNUP</span>
          </div>

          <div className="redirect-container">
            <span>Already have an account?</span>
            <Link to="/login" className="redirectUrl">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

SignupMain.propTypes = {
  loading: PropTypes.bool,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.signupData.loading,
  signUpError: state.signupData.error,
  signupSucess: state.signupData.signupSucess,
  signedupUserName: state.signupData.userName,
});

export default connect(mapStateToProps, { signupUser, signupReset })(
  SignupMain
);
