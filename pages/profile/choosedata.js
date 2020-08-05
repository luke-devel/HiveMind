import React, { useState, useEffect } from "react";
import Router from "next/router";
import Footer from "../../components/Footer";
import Profile from "../../components/Profile";
import Header from "../../components/Header";
import GetTopArtists from "../../components/GetTopArtists";
import fetch from "isomorphic-unfetch";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import { CircularProgress } from "@material-ui/core";
import { update } from "lodash";

export default function ChooseData() {
  const [artistArray, setArtistArray] = useState();
  const [hasDB, setHasDB] = useState("false");
  const [userToken, setUserToken] = useState([]);
  const [spotifyToken, setSpotifyToken] = useState(Cookie.get("spotifytoken"));

  // useEffect calls fetchData(), which will make a get request for raw top artist data from db.
  useEffect(() => {
    try {
      const tkn = Cookie.get("usertoken");
      const decoded = jwt_decode(tkn);
      console.log("decoded", decoded);
      // setUserToken(decoded);
      if (decoded.email !== undefined && spotifyToken !== undefined) {
        console.log("here");
        // console.log(decoded.email);
        updateDB(spotifyToken, decoded.email).then(() => {
          fetchData(decoded.email);
        });
      } else {
        Router.push("/profile/choosedata");
      }
    } catch (error) {
      console.log("ERRRR: ", error);
    }
  }, [0]);

  const updateDB = async (spotToken, userJWT) => {
    await axios("http://localhost:3000/api/spotify/addtopartists", {
      method: "post",
      data: {
        spotifytoken: spotToken,
        useremail: userJWT,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          // success
          setHasDB("true");
        } else {
          // post req failed
          console.log("post req failed in updateDB");
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchData = async (email) => {
    if (artistArray === undefined) {
      const rawArtistsResponse = await axios.get(
        "http://localhost:3000/api/spotify/dataforfetch",
        {
          headers: {
            useremail: email, //the token is a variable which holds the token
          },
        }
      );
      setArtistArray(rawArtistsResponse.data);
    }
  };

  return (
    <>
      <Header />
      <div id="outer" style={{ boxSizing: "border-box" }}>
        <div id="body">
          {artistArray ? (
            <GetTopArtists artistArray={artistArray} />
          ) : (
            <div
              style={{
                backgroundColor: "#EF7B73",
                height: "100vh",
              }}
            >
              <div
                style={{
                  backgroundColor: "#EF7B73",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  WebkitTransform: "translate(-50%, -50%)",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <CircularProgress />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
