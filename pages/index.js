import React, { Component } from "react";
import Router from "next/router";
import jwt_decode from "jwt-decode";
import Landing from "../components/Landing";
import Footer from "../components/Footer";

class Index extends Component {
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
    const token = localStorage.usertoken;
    if (token) {
      try {
        const decoded = jwt_decode(token);
        this.setState({
          username: decoded.username,
          email: decoded.email
        });
      } catch {
        Router.replace("/");
      }
    }
  }

  // runs getTokenInfo() to check if user has valid JWT token.
  componentDidMount() {
    this.getTokenInfo();
  }

  render() {
    return (
      <>
        <Landing />
        <Footer />
      </>
    );
  }
}

export default Index;
