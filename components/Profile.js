import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Router from "next/router";
import Border from "./Border";
import AddData from "./AddData";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [spotifyToken, setSpotifyToken] = useState("");

  useEffect(() => {
    // console.log("sup");
    setToken();
    getTokenInfo();
  }, [0]);

  function getTokenInfo() {
    try {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      setUsername(decoded.username);
      setEmail(decoded.email);
    } catch (error) {
      console.log(error);
    }
  }

  function setToken() {
    setSpotifyToken(localStorage.getItem("spotifyAccessToken"));
    // console.log("set");
  }

  function checkToken() {
    if (spotifyToken) {
      Router.replace("/profile/choosedata");
    } else {
      Router.replace("/spotify/landing");
    }
  }

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
        <h1 style={{ fontStyle: "italic" }}>Welcome, {username}! </h1>
        {!spotifyToken ? (
          <AddData />
        ) : (
          <div>
            <h3 style={{ paddingTop: 40, fontStyle: "italic", fontSize: 30 }}>
              Now your Spotify account is linked.
            </h3>
            <a
              onClick={checkToken}
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
                  title: "choose your top artists and tracks for your profile",
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
