import React, { Component, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Router from "next/router";
import Border from "./Border";
import AddData from "./AddData";
import { spotifyWebApiURL } from "../constants/constants";
import { render } from "react-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      errors: {},
      showModal: false
    };
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
      } catch {
        Router.replace("/login");
      }
    } else {
      // token not found in localStorage, back to login
      Router.replace("/login");
    }
  }

  componentDidMount() {
    this.getTokenInfo();
  }

  goToSpotify() {
    document.location = spotifyWebApiURL;
  }

  getToken(){
    return localStorage.getItem("spotifyAccessToken");
  }

  render() {
    return (
      <>
        <div
          style={{
            minHeight: "100%",
            minHeight: "100vh",
            backgroundColor: "#EF7B73",
            textAlign: "center",
            padding: "50px",
            border: "5px solid #212529",
            borderTopWidth: 0
          }}
        >
          <h1 style={{ fontStyle: "italic" }}>
            welcome, {this.state.username}!{" "}
          </h1>
          {!this.getToken ? (
            <AddData />
          ) : (
            <div>
              <h3 style={{ paddingTop: 40, fontStyle: "italic", fontSize: 30 }}>
                Now your Spotify account is linked.
              </h3>
              <a
                href="/profile/choosedata"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "900",
                  color: "#212529",
                  fontStyle: "italic",
                  paddingRight: 30,
                  marginLeft: "-30px",
                  cursor: "pointer"
                }}
              >
                <Border
                
                  border={{
                    title:
                      "choose your top artists and tracks for your profile",
                    width: "30vh",
                    borderSize: "5px",
                    fontSize: "30px"
                  }}
                />
              </a>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Profile;
