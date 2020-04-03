import React, { Component } from "react";
import Router from "next/router";
import { register } from "./UserFunctions";
import Border from "./Border";
import jwt_decode from "jwt-decode";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

   // checks if user already has been logged in with JWT token in localStorage
   getTokenInfo() {
    const token = localStorage.usertoken;
    if (token) {
      try {
        const decoded = jwt_decode(token);
        this.setState({
          username: decoded.username,
          email: decoded.email
        });
        Router.replace('/profile/landing');
      } catch {
        // err in JWT token. does nothing
      }
    }
  }

  componentDidMount() {
    this.getTokenInfo();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    register(newUser)
      .then(res => {
        Router.replace("/login");
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  render() {
    return (
      <div className="row m-3 p-3">
        <div
          className="col-lg-6 col-md-10 rounded-lg bg-light mx-auto shadow-lg"
          style={{ paddingLeft: "0px", paddingRight: "0px" }}
        >
          <form
            noValidate
            onSubmit={this.onSubmit}
            style={{
              border: "5px solid #212529",
              borderTopRightRadius: "4px",
              borderBottomRightRadius: "4px",
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
              borderCollapse: "separate",
              borderSpacing: "10px",
              padding: "30px",
              paddingTop: "00px",
              paddingBottom: "0px"
            }}
          >
            <Border
              border={{
                title: "hivemind",
                width: "28vh",
                fontSize: "6vh",
                borderSize: "5px"
              }}
            />
            <div className="form-group">
              <label
                htmlFor="username"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  fontSize: "18px",
                  color: "#212529"
                }}
              >
                username
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="email"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  fontSize: "18px",
                  color: "#212529"
                }}
              >
                email
              </label>

              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="password"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  fontSize: "18px",
                  color: "#212529"
                }}
              >
                password
              </label>

              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-block "
              style={{
                backgroundColor: "#EF7B73",
                fontFamily: "Roboto",
                fontWeight: "900",
                fontStyle: "italic",
                fontSize: "25px",
                marginTop: "20px",
                color: "#212529"
              }}
            >
              Sign Up
            </button>
            <p
              style={{
                paddingTop: "10px",
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: "18px",
                textAlign: "center",
                paddingTop: "15px",
                color: "#212529"
              }}
            >
              Already registered?{" "}
              <a
                href="/login"
                style={{ fontStyle: "italic", color: "#EF7B73" }}
              >
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
