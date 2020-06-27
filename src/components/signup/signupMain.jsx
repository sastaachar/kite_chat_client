import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { signupUser, signupReset } from "../../actions/signupActions";
import Kite from "../misc/Kite";
import GirlSit from "../misc/girlSit";

import "../login/loginPage.css";
import "./signupPage.css";

class SignupMain extends Component {
  state = {
    formEmail: "",
    formUserName: "",
    formPassword: "",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { formEmail, formUserName, formPassword } = this.state;
    let userData = {
      userName: formUserName,
      email: formEmail,
      password: formPassword,
    };

    //call the signup method
    this.props.signupUser(userData);
    //if sucess redirect to the login page
  };

  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillUnmount() {
    //if user signedin only then call this
    if (this.props.signupSucess) this.props.signupReset();
  }

  render() {
    return (
      <div className="loginMain">
        {this.props.signupSucess ? <Redirect to={`/login`} /> : null}
        <div className="leftBox">
          {this.props.loading ? <span>loading</span> : null}
          {this.props.signupSucess ? <span>sucess</span> : null}
          <div className="logoPic">
            <Kite></Kite>
          </div>
          <span className="logoName">kite Chat</span>
          <span className="logoTag">stay connected</span>
        </div>
        <div className=" splUserName inputFld">
          <br />
          <input
            type="text"
            id="userName"
            name="formUserName"
            onChange={this.handleFormChange}
          />
          <label htmlFor="userName">Pick a Username</label>
        </div>
        <div className="girlSit">
          <GirlSit></GirlSit>
        </div>

        <div className="rightBox">
          <div className="loginBox">
            <form>
              <div className="inputFld">
                <label className="emailSpl" htmlFor="email">
                  Email
                </label>
                <br />
                <input
                  type="text"
                  id="email"
                  name="formEmail"
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
            <button className="loginBtn" onClick={this.handleSubmit}>
              <span>SIGN UP</span>
            </button>

            <div className="signupUrl">
              <span>Already have an account?</span>
              <Link to="/login">Login</Link>
            </div>
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
  signupSucess: state.signupData.signupSucess,
  signedupUserName: state.signupData.userName,
});

export default connect(mapStateToProps, { signupUser, signupReset })(
  SignupMain
);
