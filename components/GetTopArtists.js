import Border from "./Border";
import Router from "next/router";
import React, { useState, useEffect } from "react";
import ArtistList from "./ArtistList";
import DataTab from './DataTab';
import fetch from "isomorphic-unfetch";
import Grid from '@material-ui/core/Grid';

export default function GetTopArtists({ artistArray }) {
  // console.log("hh", GetTopArtists);
  const refresh = () => {
    window.location.reload(false);
  };
  const [addedArtistsList, setAddedArtistsList] = useState(artistArray);
  const [email, setEmail] = useState("");
  const [watch, setWatch] = useState("");

  // *pulls data from spotify api using users client secret to mysql database*
  // *stored in addedArtistsList* - runs each page load*

  return (
    <div
      style={{
        minHeight: "100%",
        backgroundColor: "#EF7B73",
        borderTopWidth: 0,
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
                paddingTop: 10,
              }}
            >
              Your Top Artists
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {addedArtistsList && (
              <h2 style={{ textAlign: "center", paddingTop: 5 }}>
                Favorite artists added to your profile:
              </h2>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {addedArtistsList || watch ? (
              <div>
                <h3
                  style={{
                    textAlign: "center",
                    paddingTop: 10,
                    fontWeight: 600,
                    fontStyle: "bold",
                    fontSize: 25,
                  }}
                >
                  Here are your top artists pulled from Spotify which will be added to your top artists data. Click to remove any artists who you DO NOT want on your data for matching. note: not all of these artists will appear on your public profile, but they will be used in the process of caluclating potential matches on the site.
                </h3>
                {!addedArtistsList && (<div
                  onClick={refresh}
                  style={{
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontWeight: "900",
                    color: "#212529",
                    fontStyle: "italic",
                    paddingRight: 30,
                    marginLeft: "-30px",
                  }}
                >
                  <Border
                    border={{
                      title: "Click to Refresh",
                      width: "10%",
                      borderSize: "3px",
                      fontSize: "20px",
                    }}
                  />
                </div>)}
              </div>
            ) : (
              <a
                className="navbar-brand"
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <Border
                  border={{
                    title: "click to populate database",
                    width: "60va",
                    fontSize: "25px",
                    borderSize: "3px",
                  }}
                />
              </a>
            )}
            <DataTab artistArray={artistArray}/>
              {/* <ArtistList artistArray={artistArray} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
