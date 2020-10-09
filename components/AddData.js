import Router from "next/router";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import SpotifyIcon from "./images/SpotifyIcon";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import ArtistList from "./ArtistList";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import DataTab from "./DataTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#EF7B73",
    paddingTop: 15,
  },
}));

export default function AddData() {
  const [artistArray, setArtistArray] = useState();
  const [hasDB, setHasDB] = useState("false");
  const [userToken, setUserToken] = useState([]);
  const [spotifyToken, setSpotifyToken] = useState(Cookie.get("spotifytoken"));
  const classes = useStyles();

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
        Router.push("/profile/landing");
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} style={{ marginTop: 20 }}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} lg={6} style={{ textAlign: "center" }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              style={{ backgroundColor: "black" }}
              centered
              item
              md={12}
            >
              <Tab label="Your Favorite Artists" {...a11yProps(0)} />
            </Tabs>
          </AppBar>
          <TabPanel
            value={value}
            index={0}
            style={{ backgroundColor: "#EF7B73" }}
            component={"span"}
          ></TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
