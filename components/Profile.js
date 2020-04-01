import React, { Component, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Router from "next/router";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      errors: {},
      showModal: false
    };
  }
  getTokenInfo() {
    console.log(`hello in profile component`);
    const token = localStorage.usertoken;
    console.log("token", token);

    if (token) {
      const decoded = jwt_decode(token);
      console.log("decoded token", decoded);
      this.setState({
        username: decoded.username,
        email: decoded.email
      });
    } else {
      // token not found, back to login
      Router.replace("/login");
    }
  }

  componentDidMount() {
    // console.log("component mounted")
    this.getTokenInfo();
  }

  render() {
    return (
      <>
        <div
          style={{
            minHeight: "100%",
            minHeight: "100vh",
            backgroundColor: "#EF7B73",
            textAlign: "center"
          }}
        >
          <h1>welcome, {this.state.username} </h1>

          <h3 style={{ paddingTop: 30 }}>login with spotify</h3>
          <a href="/login">
            <button>login</button>
          </a>
        </div>
      </>
    );
  }
}

export default Profile;
