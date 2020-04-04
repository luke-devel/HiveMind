import bcrypt from "bcrypt";
import fetch from "isomorphic-unfetch";
import GetUsersTopArtists from "../../../js/GetUsersTopArtists";

export default async function(req, res) {
  // console.log(req.headers);
  console.log("now on server-side");
  let topArtists;
  setTimeout(async function() {
    topArtists = await GetUsersTopArtists(
      req.headers.spotifytoken,
      req.headers.useremail
    );
  }, 0);
  // console.log(topArtists);

  res.end("hello");
}
