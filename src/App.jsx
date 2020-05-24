import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ChatMain from "./components/chat/chatMain";
import LoginMain from "./components/login/loginMain";
import SignupMain from "./components/signup/signupMain";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>Hi all</div>
        <Router>
          <Route path="/chat" component={ChatMain} />
          <Route path="/login" component={LoginMain} />
          <Route path="/signup" component={SignupMain} />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
