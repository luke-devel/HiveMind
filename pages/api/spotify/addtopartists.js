import bcrypt from "bcrypt";
import db from "../models";
import fetch from "isomorphic-unfetch";
import GetUsersTopArtists from "../../../js/GetUsersTopArtists";

export default async function(req, res) {
  console.log("now on server-side");
  let topArtists;
  setTimeout(async function() {
    topArtists = await GetUsersTopArtists(req.headers.spotifytoken);
  }, 3000);
  console.log(topArtists);

  res.end("hello");
}
