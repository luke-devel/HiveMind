let prod = true;

const scopes = "user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played+user-library-read";
// const redirectURI = prod ? "herokuapp.com/spotify" : "http://localhost:3000/spotify";
const redirectURI = "http://localhost:3000/spotify/login";


export const clientID = "a95607d988d845b8aa8c38e6c722e09a";
export const clientSecret = "f39ba4f139264de5b01e8c8180eeafe5";
export const spotifyWebApiURL = `https://accounts.spotify.com/authorize/?client_id=${clientID
}&response_type=token&redirect_uri=${redirectURI}&scope=${scopes}`;
export const spotifyProfileURL = "https://api.spotify.com/v1/me?access_token=";
export const spotifyPlaylistURL = "https://api.spotify.com/v1/me/playlists?access_token=";
export const spotifyTest= "https://api.spotify.com/v1/me/tracks/"
export const spotifySearchURL = "https://api.spotify.com/v1/search?q=";
export const spotifyArtistURL = "https://api.spotify.com/v1/artists/";
export const spotifyAlbumURL = "https://api.spotify.com/v1/albums/";