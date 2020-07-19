import React, { Component } from "react";

import { SERVER_URL } from "../../actions/types";

class AccountVerification extends Component {
  state = {
    responseRecieved: false,
    verified: false,
    message: "",
  };

  componentWillMount = () => {
    const { pathname } = window.location;
    fetch(SERVER_URL + pathname, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${pathname.split("/")[3]}`,
      },
    })
      .then((res) => {
        this.setState({ responseRecieved: true, verified: res.ok });
        return res.json();
      })
      .then((resObj) => {
        console.log(resObj.message);
      });
  };

  componentDidMount = () => {
    console.log(window.location.pathname.split("/")[3]);
  };

  render() {
    return (
      <div className="verification">
        {this.state.responseRecieved
          ? this.state.verified
            ? "verified"
            : "not verified"
          : "Loading.."}
      </div>
    );
  }
}

export default AccountVerification;
