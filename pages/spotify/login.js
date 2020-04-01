import React, { Component } from "react";
import Router from "next/router";
import { spotifyWebApiURL } from "../../constants/constants";
import Header from "../../components/Header";

class spotifyLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: ""
    };
  }

  componentDidMount = () => {
    let url = window.location.href;
    if (url.indexOf("_token") > -1) {
      let access_token = url
        .split("_token=")[1]
        .split("&")[0]
        .trim();
      this.setState({ access_token });
      Router.push({
        pathname: "/spotify/user",
        query: { access_token }
      });
    }
  };

  makeSpotifyProfileCall = event => {
    event.preventDefault();
    const { access_token } = this.state;
    if (access_token === "") {
      document.location = spotifyWebApiURL;
    } else {
      Router.push({
        pathname: "/spotify/user",
        query: { access_token }
      });
    }
  };

  render() {
    const { access_token } = this.state;
    return (
      <>
        <Header />
        <div
          style={{
            minHeight: "100%",
            minHeight: "100vh",
            alignItems: "center",
            backgroundColor: "#EF7B73"
          }}
        >
          <div
            className="row justify-content-center mt-0"
            style={{ paddingTop: 200 }}
          >
            <button
              onClick={event => this.makeSpotifyProfileCall(event)}
              className="btn"
              style={{
                backgroundColor: "#212529",
                width: "auto",
                height: "45px",
                fontSize: "18px",
                fontWeight: "600",
                fontStyle: "italic",
                fontFamily: "roboto",
                color: "#EF7B73"
              }}
            >
              {access_token === "" ? "login with spotify" : "one moment"}
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default spotifyLogin;
