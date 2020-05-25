import React, { Component } from "react";
import { Provider } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import MainPage from "./components/main/mainPage";
import ChatMain from "./components/chat/chatMain";
import LoginMain from "./components/login/loginMain";
import SignupMain from "./components/signup/signupMain";
import NotFoundPage from "./components/notFoundPage/notFound";
import UnauthenticatedRoute from "./components/unauthenticatedRoute";
import AuthenticatedRoute from "./components/authenticatedRoute";

import store from "./store";

class App extends Component {
  state = {};

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <UnauthenticatedRoute exact path="/">
              <MainPage />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute path="/login">
              <LoginMain />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute path="/signup">
              <SignupMain />
            </UnauthenticatedRoute>
            <AuthenticatedRoute path="/chat">
              <ChatMain />
            </AuthenticatedRoute>
            <Route path="/404" component={NotFoundPage} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
