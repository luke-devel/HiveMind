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
      userInput: this.state.userInput,
      password: this.state.password
    };
    console.log(`logging in`);
    login(newUser)
      .then(res => {
        console.log("herenow");
        console.log('resdata', res.data);

        switch (res.data) {
          case "invalid username or email":
            alert("invalid username or email");
            Router.replace("/login");
            break;
          case "invalid password":
            // alert("invalid password");
            Router.replace("/login");
            break;
          default:
            console.log("replacing with /profile");
            Router.replace("/profile");
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
            <h3
              style={{
                fontSize: "50px",
                fontFamily: "Roboto",
                textAlign: "center",
                paddingTop: "20px",
                fontStyle: "italic",
                fontWeight: "900",
                marginBottom: "10px",
                color: "#212529"
              }}
            >
              hivemind
            </h3>

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
                color: "#212529"
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
