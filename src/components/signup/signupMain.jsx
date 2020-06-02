import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { loginUser } from "../../actions/loginActions";
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

    const SERVER_URL = "http://localhost:5000/users/signup";
    try {
      let res = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName: formUserName,
          email: formEmail,
          password: formPassword,
        }),
      });

      res = await res.json();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
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
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loginData.loading,
});

export default connect(mapStateToProps, { loginUser })(SignupMain);
