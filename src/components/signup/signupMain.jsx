import React, { Component } from "react";

const SERVER_URL = "http://localhost:5000/users/signup";
class SignupMain extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, email, password } = this.state;

    try {
      let res = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      });
      res = await res.json();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="loginMain">
        <span>Sign Up here</span>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          Name:
          <input name="userName" onChange={this.handleChange} />
          Email:
          <input name="email" onChange={this.handleChange} />
          Password:
          <input name="password" onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default SignupMain;
