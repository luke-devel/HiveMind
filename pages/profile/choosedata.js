import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Profile from "../../components/Profile";
import Header from "../../components/Header";
import GetTopArtists from "../../components/GetTopArtists";
import fetch from "isomorphic-unfetch";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function ChooseData({ artistArray }) {
  console.log(artistArray);
  if (artistArray === false) {
    window.location.reload(false);
  }

  const [addedArtistsList, setAddedArtistsList] = useState(artistArray);
  return (
    <>
      <Header />
      <div id="outer" style={{ boxSizing: "border-box" }}>
        <div id="body">
          < GetTopArtists artistArray={artistArray} />   
        </div>
      </div>
      <Footer />
    </>
  );
}

// needs to not fetch unless data is empty for user
ChooseData.getInitialProps = async function ({ req }) {
  const isServer = !!req;
  console.log(isServer);
  if (isServer) {
    let spotifyArray;

    // function to retrieve cookie value
    const getCookie = (cname) => {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(req.headers.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    };
    const usertoken = getCookie("usertoken");
    const decodeduser = await jwt_decode(usertoken);
    const spotifytoken = getCookie("spotifytoken");

    // Add or refresh user's top artists to mysql database using spotify api
    await fetch("http://localhost:3000/api/spotify/addtopartists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        useremail: decodeduser.email,
        spotifytoken: spotifytoken,
      },
      credentials: "same-origin",
    })
      .then((res) => {
        // res.json();
      })
      .then((data) => {})
      .catch(async (err) => {
        console.log(
          `there was an error, repopulating databasefor user ${decodeduser.email} in choosedata.js`,
          err
        );
      });

    // Retrieve user's top artists from mysql database
    // Create artist data variable to store retrieved artist array

    await fetch("http://localhost:3000/api/spotify/dataforfetch", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        useremail: decodeduser.email,
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => (spotifyArray = data))
      .catch((err) =>
        console.log(`err in dataforfetch fetch in choosedata.js`)
      );
    return { artistArray: spotifyArray };
  } else {
    return { artistArray: false };
  }
};
