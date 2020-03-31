import React, { Component } from "react";
import Router from "next/router";
import { login } from "./UserFunctions";

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

    login(newUser)
      .then(res => {
        Router.replace("/profile");
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
            <h3
              style={{
                fontSize: "50px",
                fontFamily: "Roboto",
                textAlign: "center",
                paddingTop: "20px",
                fontStyle: "italic",
                fontWeight: "900",
                marginBottom: "0px",
                color:"#212529"
              }}
            >
              hivemind
            </h3>

            <div className="form-group">
              <label
                htmlFor="username"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  fontSize: "18px",
                  color:"#212529"
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
                  color:"#212529"
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
                  color:"#212529"
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
                marginTop:"20px",
                color:"#212529"
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
                color:"#212529"
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

export default Login;
