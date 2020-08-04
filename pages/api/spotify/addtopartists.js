import bcrypt from "bcrypt";
import fetch from "isomorphic-unfetch";
import GetUsersTopArtists from "../../../js/GetUsersTopArtists";

export default async function (req, res) {
  console.log("now on server-side addtopartists");
  // console.log(req.headers);
  let topArtists;
  setTimeout(async function () {
    topArtists = await GetUsersTopArtists(
      req.headers.spotifytoken,
      req.headers.useremail
    );
  }, 0);
  // console.log(topArtists);

  res.end("hello");
}
