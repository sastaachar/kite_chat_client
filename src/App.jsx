import React, { Component } from "react";

import ChatMain from "./components/chat/chatMain";
import LoginMain from "./components/login/loginMain";
import SignupMain from "./components/signup/signupMain";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <ChatMain />
        <LoginMain />
        <SignupMain />
      </div>
    );
  }
}

export default App;
