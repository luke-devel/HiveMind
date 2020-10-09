const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

let prod = false;

const scopes =
  "user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played+user-library-read";
const redirectURI = prod
  ? "herokuapp.com/spotify"
  : "http://localhost:3000/spotify/login";
export const clientSecret = process.env.SPOTIFYCLIENTSECRET;
export const spotifyWebApiURL = `https://accounts.spotify.com/authorize/?client_id=${process.env.SPOTIFYCLIENTID}&response_type=token&redirect_uri=${redirectURI}&scope=${scopes}`;
