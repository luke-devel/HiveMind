import axios from "axios";
import db from "../pages/api/models";

export default async function GetUsersTopArtists(token) {
  try {
    const topArtists = await axios
      .get(
        // "https://api.spotify.com/v1/me/tracks?limit=50",
        // "https://api.spotify.com/v1/me/tracks?limit=50&offset=5",
        "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        console.log(res.data.items);
        const artistObject = res.data.items.map(
          ({ name, genres, images }, i) => ({
            id: i + 1,
            name,
            genres,
            images
          })
        );
        return artistObject;
      })
      .then(async artistObject => {
        console.log(artistObject);
        const user = await db.userdata.create({
          topartists: JSON.stringify(artistObject)
        });
        console.log("artist object written to db");
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  } catch (e) {
    console.log(`it failed in GetUsersTopArtists.js`, e);
  }
}
