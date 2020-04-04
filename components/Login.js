import React, { Component } from "react";
import Router from "next/router";
import { login } from "./UserFunctions";
import Border from "./Border";
import jwt_decode from "jwt-decode";

class Login extends Component {
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

    if (token && localStorage.SpotifyAccessToken) {
      try {
        console.log(token);
        const decoded = jwt_decode(token);
        Router.replace("/profile/landing");
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
      userInput: this.state.userInput,
      password: this.state.password
    };
    console.log(`logging in`);
    login(newUser)
      .then(res => {
        switch (res.data) {
          case "invalid username or email":
            alert("invalid username or email");
            Router.replace("/login");
            break;
          case "invalid password":
            Router.replace("/login");
            break;
          default:
            console.log("replacing with '/profile/landing'");
            Router.replace("/profile/landing");
            break;
        }
      })
      .catch(err => {
        console.log("Login Error", err);
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
                htmlFor="email"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  fontSize: "18px",
                  color: "#212529"
                }}
              >
                username or email
              </label>

              <input
                type="userInput"
                className="form-control"
                name="userInput"
                placeholder="username or email"
                value={this.state.userInput}
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
              Sign In
            </button>
            <p
              style={{
                paddingTop: "10px",
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: "18px",
                textAlign: "center",
                paddingTop: "15px",
                color: "#212529",
                marginBottom: 20
              }}
            >
              Not registered?{" "}
              <a
                href="/register"
                style={{ fontStyle: "italic", color: "#EF7B73" }}
              >
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
