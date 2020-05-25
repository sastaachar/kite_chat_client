import { Route, Redirect } from "react-router-dom";

import React, { Component } from "react";

import { connect } from "react-redux";

class AuthenticatedRoute extends Component {
  render() {
    const { children, loggedIn, ...rest } = this.props;
    return <Route {...rest}>{loggedIn ? children : <Redirect to="/" />}</Route>;
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.loginData.loggedIn,
});

export default connect(mapStateToProps)(AuthenticatedRoute);
