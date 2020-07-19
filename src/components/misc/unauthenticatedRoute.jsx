import { Route, Redirect } from "react-router-dom";

import React, { Component } from "react";

import { connect } from "react-redux";

class UnauthenticatedRoute extends Component {
  render() {
    const { children, loggedIn, preCheckComplete, ...rest } = this.props;

    return (
      <Route {...rest}>
        {preCheckComplete ? (
          !loggedIn ? (
            children
          ) : (
            // precheck complete and loggedIn
            <Redirect to="/chat" />
          )
        ) : (
          // this will force preCheck ( / is loadingPage that has preCheck on mount)
          <Redirect to="/" />
        )}
      </Route>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.loginData.loggedIn,
  preCheckComplete: state.preCheck.complete,
});

export default connect(mapStateToProps)(UnauthenticatedRoute);
