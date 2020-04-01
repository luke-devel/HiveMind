import React, { Component, useEffect } from "react";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import axios from "axios";

import {
  spotifyProfileURL,
  spotifyPlaylistURL,
  spotifyTest
} from "../../constants/constants";

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, playlist, access_token, topArtists } = this.props;
    console.log(topArtists.items[1].name);
    
    return (
      <>
        <div className="row mt-5 justify-content-center">
          <h3>Welcome {user.display_name.split(" ")[0]}!</h3>
        </div>
        <div className="row mt-2 justify-content-center">
          <img src={user.images[0].url} className="img-responsive" />
        </div>
        <div className="mt-4 justify-content-center">
          <p className="text-center">username: {user.display_name}</p>
          <p className="text-center">email: {user.email}</p>
          <p className="text-center">follower count: {user.followers.total}</p>
        </div>
  
      </>
    );
  }
}

User.getInitialProps = async function(context) {
  const { access_token } = context.query;
  const res = await fetch(spotifyProfileURL + access_token);
  const user = await res.json();
  const res2 = await fetch(spotifyPlaylistURL + access_token);
  const playlist = await res2.json();

  const topArtists = await axios.get(
    // "https://api.spotify.com/v1/me/tracks?limit=50",
    "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50",
    {
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${access_token}`
      }
    }
  );
  return {
    access_token,
    user,
    playlist: playlist.items,
    topArtists: topArtists.data
  };
};

export default User;
