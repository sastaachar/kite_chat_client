import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";

import ChatMain from "./components/chat/chatMain";
import LoginMain from "./components/login/loginMain";
import SignupMain from "./components/signup/signupMain";

import store from "./store";

class App extends Component {
  state = {};

  render() {
    return (
      <Provider store={store}>
        <div>Hi all</div>
        <Router>
          <Route path="/chat" component={ChatMain} />
          <Route path="/login" component={LoginMain} />
          <Route path="/signup" component={SignupMain} />
        </Router>
      </Provider>
    );
  }
}

export default App;
