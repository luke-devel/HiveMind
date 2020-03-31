import React, { Component } from "react";
import Router from "next/router";
import { register } from "./UserFunctions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
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
      name: this.state.name,
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
              border: "5px solid black",
              borderTopRightRadius: "4px",
              borderBottomRightRadius: "4px",
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
              borderCollapse: "separate",
              borderSpacing: "10px",
              padding:"30px",
              paddingTop:"00px",
              paddingBottom:"0px"
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
                marginBottom: "0px"
              }}
            >
              hivemind
            </h3>

            <div className="form-group">
              <label
                htmlFor="name"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  fontSize: "18px"
                }}
              >
                name
              </label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                placeholder="name"
                value={this.state.first_name}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="email"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  fontSize: "18px"
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
                  fontSize: "18px"
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
                fontSize: "25px"
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
                textAlign:"center",
                paddingTop:"15px"
              }}
            >
              Already registered?{" "}
              <a href="/login" style={{ fontStyle: "italic", color:"#EF7B73" }}>
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
