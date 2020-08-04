import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ArtistList from "./ArtistList";

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

export default function DataTab({ artistArray }) {
  const [favArtists, setFavArtists] = useState(artistArray);
  const [removedArtists, setRemovedArtists] = useState([]);

  const removeArtist = (id) => {
    setRemovedArtists(removedArtists.concat(favArtists[id]));
    setFavArtists(favArtists.filter((artist, index) => id !== index));
  };

  const reAddArtist = async (id) => {
    var tempArr = favArtists;
    tempArr.unshift(removedArtists[id]);
    setFavArtists(tempArr);
    setRemovedArtists(removedArtists.filter((artist, index) => id !== index));
  };

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          style={{ backgroundColor: "black" }}
          centered
        >
          <Tab label="Your Favorite Artists" {...a11yProps(0)} />
          <Tab label="Your Removed Artists" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel
        value={value}
        index={0}
        style={{ backgroundColor: "#EF7B73" }}
        component={"span"}
      >
        <ArtistList artistArray={favArtists} removeArtist={removeArtist} />
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        style={{ backgroundColor: "#EF7B73" }}
        component={"span"}
      >
        <ArtistList
          artistArray={removedArtists}
          reAddArtist={reAddArtist}
          removedTab={true}
        />
      </TabPanel>
    </div>
  );
}
