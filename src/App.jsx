import React, { Component } from "react";
import { Provider } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//import MainPage from "./components/main/mainPage";
import ChatMain from "./components/chat/chatMain";
import LoginMain from "./components/login/loginMain";
import SignupMain from "./components/signup/signupMain";
import NotFoundPage from "./components/notFoundPage/notFound";
import UnauthenticatedRoute from "./components/misc/unauthenticatedRoute";
import AuthenticatedRoute from "./components/misc/authenticatedRoute";
import LoadingPage from "./components/misc/loadingPage";
import PreCheckRoute from "./components/misc/preCheckRoute";

import store from "./store";

import "./App.css";

//need to add a way to redirect users from the http version to https

class App extends Component {
  //redirect to https
  constructor(props, context) {
    super();
    const url = window.location.origin;
    if (!url.includes("localhost") && !url.includes("https")) {
      window.location = `https:${url.split(":")[1]}`;
    }
  }
  state = {};
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            {
              //always hit the the loading page on reload or new load
              //chaging link in the browser is reload dumbass
            }
            <PreCheckRoute exact path="/">
              <LoadingPage />
            </PreCheckRoute>
            {
              //if user tries to go to these paths after being
              //but technically not possible cause the page will reload
              //the main page is suppposed to be in / route but the page sucks for now
              //so we are going with login
            }

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
              //if oversmart user tries anything
            }
            <Route exact path="/404" component={NotFoundPage} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
