import Border from "./Border";
import { spotifyWebApiURL } from "../constants/constants";

export default function AddData() {
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
