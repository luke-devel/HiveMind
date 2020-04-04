import Border from "./Border";

export default function AddData() {
  const scopes =
    "user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played+user-library-read";

  const spotifyWebApiURL = `https://accounts.spotify.com/authorize/?client_id=a95607d988d845b8aa8c38e6c722e09a&response_type=token&redirect_uri=http://localhost:3000/spotify/login&scope=${scopes}`;

  function goToSpotify() {
    document.location = spotifyWebApiURL;
  }

  return (
    <div>
      <h3 style={{ paddingTop: 40, fontStyle: "italic", fontSize: 30 }}>
        First, lets add some data to your account.
      </h3>
      <a
        onClick={goToSpotify}
        style={{
          fontFamily: "Roboto",
          fontWeight: "900",
          color: "#212529",
          fontStyle: "italic",
          paddingRight: 30,
          marginLeft: "-30px",
          cursor: "pointer"
        }}
      >
        <Border
          border={{
            title: "Login With Spotify",
            width: "30vh",
            borderSize: "5px",
            fontSize: "30px"
          }}
        />
      </a>
    </div>
  );
}

// AddData.getInitialProps = async ctx => {
//   const redirectURI = process.env.SPOTIFYREDIRECTURI;
//   const clientID = process.env.SPOTIFYCLIENTID;
//   return { redirectURI: redirectURI, clientID: clientID };
// };
