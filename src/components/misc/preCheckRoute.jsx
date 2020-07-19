import { Route, Redirect } from "react-router-dom";

import React, { Component } from "react";

import { connect } from "react-redux";

class PreCheckRoute extends Component {
  render() {
    const { children, loggedIn, preCheckComplete, ...rest } = this.props;
    return (
      <Route {...rest}>
        {!preCheckComplete ? children : <Redirect to="/login" />}
      </Route>
    );
  }
}

const mapStateToProps = (state) => ({
  preCheckComplete: state.preCheck.complete,
});
export default connect(mapStateToProps)(PreCheckRoute);
