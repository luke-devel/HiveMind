import Footer from "../../components/Footer";
import Profile from "../../components/Profile";
import Header from "../../components/Header";
// // DataBody to be worked on soon
import DataBody from "../../components/DataBody";
import GetTopArtists from "../../components/GetTopArtists";
// import GetUsersTopArtists from "../../js/GetUsersTopArtists";
// const { QueryTypes, Sequelize } = require("sequelize");
// let sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     operatorsAliases: false,
//   }
// );
import fetch from "isomorphic-unfetch";
import axios from "axios";
import jwt_decode from "jwt-decode";
// import db from "../../pages/api/models";

//{ artistArray }
export default function ChooseData({ artistArray }) {
  console.log(artistArray); // prints artist string

  const bodyStyle = {
    fontFamily: "sans-serif",
    margin: "0",
    display: "grid",
    gridTemplateColumns: "100%",
    gridTemplateRows: "auto 70px",
    gridTemplateAreas: `
      "main"
      "footer"`,
  };

  const bodyNavigation = {
    listStyle: "none",
    margin: "0",
    padding: "0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: " center",
    height: "100%",
  };
  return (
    <>
      <Header />
      <div id="outer" style={{ boxSizing: "border-box" }}>
        <div id="body" style={bodyStyle}>

            <GetTopArtists artistArray={artistArray} />
          <footer
            style={{ padding: "0px", textAlign: "center", gridArea: "footer" }}
          ></footer>
        </div>
      </div>
    </>
  );
}

// needs to not fetch unless data is empty for user
ChooseData.getInitialProps = async function ({ req }) {
  const isServer = !!req;
  console.log(isServer);
  if (isServer) {
    let spotifyArray;

    // function to retrieve cookie value
    const getCookie = (cname) => {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(req.headers.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    };
    const usertoken = getCookie("usertoken");
    const decodeduser = await jwt_decode(usertoken);
    const spotifytoken = getCookie("spotifytoken");

    // Add or refresh user's top artists to mysql database using spotify api
    await fetch("http://localhost:3000/api/spotify/addtopartists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        useremail: decodeduser.email,
        spotifytoken: spotifytoken,
      },
      credentials: "same-origin",
    })
      .then((res) => {
        console.log(res);
        // res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch(async (err) => {
        console.log(
          `there was an error, repopulating databasefor user ${decodeduser.email} in choosedata.js`,
          err
        );
      });

    // Retrieve user's top artists from mysql database
    // Create artist data variable to store retrieved artist array

    await fetch("http://localhost:3000/api/spotify/dataforfetch", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        useremail: decodeduser.email,
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => (spotifyArray = data))
      .catch((err) =>
        console.log(`err in dataforfetch fetch in choosedata.js`)
      );
    return { artistArray: spotifyArray };
  } else {
    return { artistArray: ["Your Database is empty. Click above to refresh."] };
  }
};
