import React, { useState, useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import Header from "../../components/Header";
import Border from "../../components/Border";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const [SpotifyAccessToken, setSpotifyAccessToken] = useState("");

  useEffect(() => {
    let url = window.location.href;
    if (url.indexOf("_token") > -1) {
      let tempToken = url.split("_token=")[1].split("&")[0].trim();
      setSpotifyAccessToken(tempToken);
    }
    Cookie.set("spotifytoken", SpotifyAccessToken);
    Router.replace("/profile/choosedata");
  });

  return (
    <div
      style={{
        backgroundColor: "#EF7B73",
        height: "100vh",
        border: "5px solid #212529",
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
  );
}
