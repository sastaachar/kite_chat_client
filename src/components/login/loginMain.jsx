import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loginUser } from "../../actions/loginActions";

class LoginMain extends Component {
  state = {};
  componentDidMount = () => {
    let userData = {
      userName: "bfffsefva",
      password: "a",
    };
    this.props.loginUser(userData);
  };
  render() {
    return (
      <div className="loginMain">
        {this.props.loading ? <span>loading</span> : null}
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
