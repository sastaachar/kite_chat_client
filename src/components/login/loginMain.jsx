import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loginUser } from "../../actions/loginActions";

class LoginMain extends Component {
  state = {
    formEmail: "",
    formUserName: "",
    formPassword: "",
  };
  handleLogin = () => {
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
        {this.props.loading ? <span>loading</span> : null}
        <form>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="formEmail"
            onChange={this.handleFormChange}
          />
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            name="formUserName"
            onChange={this.handleFormChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="formPassword"
            onChange={this.handleFormChange}
          />
        </form>
        <button onClick={this.handleLogin}>LOGIN</button>
        <span>Login here</span>
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
