import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import Router from "next/router";
import Border from "./Border";
import AddData from "./AddData";
import DataTab from "./DataTab";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [spotifyToken, setSpotifyToken] = useState("");

  useEffect(() => {
    const userToken = Cookie.get("usertoken");
    getTokenInfo(userToken);
    setSpotifyToken(Cookie.get("spotifytoken"));
  }, [0]);

  function getTokenInfo(usertoken) {
    try {
      const token = usertoken;
      const decoded = jwt_decode(token);
      setUsername(decoded.username);
      setEmail(decoded.email);
    } catch (error) {
      console.log(error);
    }
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
          padding: "20px",
          borderTopWidth: 0,
        }}
      >
        <h1 style={{ fontStyle: "italic", margin: 0, color: "black" }}>
          Welcome, {username.charAt(0).toUpperCase(0) + username.slice(1)}!{" "}
        </h1>

        {/* <AddData /> */}
      </div>
    </>
  );
}
