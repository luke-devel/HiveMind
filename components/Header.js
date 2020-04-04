import Border from "./Border";
import React, { Component } from "react";
import Router from "next/router";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };

    this.onLogout = this.onLogout.bind(this);
  }
  // deleting JWT token from localStorage and logging out.
  onLogout(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    localStorage.removeItem("spotifyAccessToken");
    Router.replace("/");
  }
  render() {
    return (
      <div
        className="row"
        style={{ display: "block", border: "5px solid #212529", margin: 0 }}
      >
        <nav
          className="navbar navbar-default"
          role="navigation"
          style={{ backgroundColor: "#EF7B73" }}
        >
          <div
            className="navbar-header"
            style={{ padding: "40px", textAlign: "center" }}
          ></div>
          <a
            className="navbar-brand"
            href="/profile/landing"
            style={{
              textAlign: "center"
            }}
          >
            <Border
              border={{
                title: "hivemind",
                width: "110%",
                fontSize: "70px",
                borderSize: "5px"
              }}
            />
          </a>

          <ul className="nav navbar-nav navbar-right">
            <li>
              <a
                href="/"
                onClick={this.onLogout}
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "900",
                  color: "#212529",
                  fontStyle: "italic",
                  paddingRight: 30,
                  marginLeft: "-30px"
                }}
              >
                <Border
                  border={{
                    title: "logout",
                    width: "110%",
                    borderSize: "3px",
                    fontSize: "20px"
                  }}
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
