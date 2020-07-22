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
import AccountVerification from "./components/misc/accountVerification";
import Circle1 from "./components/misc/svgs/circle1.svg";
import Circle2 from "./components/misc/svgs/circle2.svg";
import Kite from "./components/misc/svgs/kite.svg";
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
              //only show if logged in
            }
            <AuthenticatedRoute path="/chat">
              <ChatMain />
            </AuthenticatedRoute>

            {
              //if user tries to go to these paths after being loggedIn
              //but technically not possible cause the page will reload
              //the main page is suppposed to be in / route but the page sucks for now
              //so we are going with login page
              //added the fragment below ,cause otherwise div will be passed with  noncomputerd argument
              //and give warnings
            }

            <React.Fragment>
              <div className="dark-container">
                <div className="logoAndName">
                  <span className="kite-name">kite Chat</span>
                  <span className="kite-moto">stay connected....</span>
                  <img src={Kite} className="logo" alt="circleVector1" />
                </div>

                <img src={Circle1} className="circle1" alt="circleVector1" />
                <img src={Circle2} className="circle2" alt="circleVector2" />
                <UnauthenticatedRoute path="/login">
                  <LoginMain />
                </UnauthenticatedRoute>
                <UnauthenticatedRoute path="/signup">
                  <SignupMain />
                </UnauthenticatedRoute>
                {/* these two paths i.e verification and reset_password
                  are speacial paths and can be accessed with restrictions
              */}
                <Route path="/account/verification/:token">
                  <AccountVerification />
                </Route>
                <Route path="/account/reset_password/:token">
                  <span>password reset</span>
                </Route>
              </div>
            </React.Fragment>

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
