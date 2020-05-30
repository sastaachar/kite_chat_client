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
import UnauthenticatedRoute from "./components/misc/unauthenticatedRoute";
import AuthenticatedRoute from "./components/misc/authenticatedRoute";
import LoadingPage from "./components/misc/loadingPage";
import PreCheckRoute from "./components/misc/preCheckRoute";

import store from "./store";

class App extends Component {
  state = {};

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            {
              //if user tries to go to these paths after being
              //but technically not possible cause the page will reload
            }
            <UnauthenticatedRoute exact path="/">
              <LoginMain />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute path="/login">
              <LoginMain />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute path="/signup">
              <SignupMain />
            </UnauthenticatedRoute>
            {
              //only show if logged in
            }
            <AuthenticatedRoute path="/chat">
              <ChatMain />
            </AuthenticatedRoute>

            {
              //always hit the the loading page on reload or new load
              //chaging link in the browser is reload dumbass
            }
            <PreCheckRoute>
              <LoadingPage />
            </PreCheckRoute>

            {
              //if oversmart user tries anything
            }
            <Route path="/404" component={NotFoundPage} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
