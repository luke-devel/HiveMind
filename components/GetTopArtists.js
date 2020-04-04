import Border from "./Border";
import Router from "next/router";
import React, { useState, useEffect } from "react";
import ArtistList from "./ArtistList";
import fetch from "isomorphic-unfetch";

export default function() {
  const [addedArtistsList, setAddedArtistsList] = useState({ title: "hello" });
  // *pulls data from spotify api using users client secret to mysql database*
  // *stored in addedArtistsList* - runs each page load*
  useEffect(() => {
    // Update the document title using the browser API
    console.log("yoo");
    fetch(`http://localhost:3000/api/spotify/addtopartists`, {
      method: "POST",
      headers: {
        spotifyToken: localStorage.spotifyAccessToken
      }
    });
  });

  return (
    <div
      style={{
        minHeight: "100%",
        backgroundColor: "#EF7B73",
        borderTopWidth: 0
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 sm-6">
            <h1
              style={{
                textAlign: "center",
                textDecoration: "underline",
                fontWeight: 600,
                fontStyle: "italic",
                paddingTop: 10
              }}
            >
              Your Top Artists
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {addedArtistsList && (
              <h2 style={{ textAlign: "center", paddingTop: 30 }}>
                Favorite artists added to your profile:
              </h2>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h3
              style={{
                textAlign: "center",
                paddingTop: 10,
                fontWeight: 600,
                fontStyle: "bold",
                fontSize: 25
              }}
            >
              Here are your top artists pulled from Spotify. Click to add to an
              artist to your profile:
            </h3>
            <ArtistList ArtistList={addedArtistsList} />
          </div>
        </div>
      </div>
    </div>
  );
}
