import Footer from "../../components/Footer";
import Profile from "../../components/Profile";
import Header from "../../components/Header";
// // DataBody to be worked on soon
import DataBody from "../../components/DataBody";
import GetTopArtists from "../../components/GetTopArtists";
// import GetUsersTopArtists from "../../js/GetUsersTopArtists";

import fetch from "isomorphic-unfetch";
import axios from "axios";
import jwt_decode from "jwt-decode";
const { QueryTypes, Sequelize } = require("sequelize");
//{ artistArray }
export default function ChooseData({ artistArray }) {
  // console.log("data", data); // prints artist string

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
          <main
            style={{
              gridArea: "main",
              padding: "16px",
              textAlign: "center",
              backgroundColor: "#EF7B73",
              border: "5px solid #212529",
              borderTopWidth: 0,
              height: "100vh",
            }}
          >
            <div></div>
            <GetTopArtists artistArray={artistArray} />
          </main>
          <footer
            style={{ padding: "0px", textAlign: "center", gridArea: "footer" }}
          ></footer>
        </div>
      </div>
    </>
  );
}

// needs to not fetch unless data is empty for user
ChooseData.getInitialProps = async function (ctx) {
  console.log(ctx.req.headers);
  const usertoken = ctx.req.headers.cookie.slice(11, 183);
  const decodeduser = await jwt_decode(usertoken);
  const spotifytoken = ctx.req.headers.cookie.slice(197, 377);
  console.log(decodeduser.email);
  console.log(spotifytoken);

  // if db exists, do this
  // await fetch("http://localhost:3000/api/spotify/dataforfetch", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     useremail: decoded.email,
  //   },
  //   credentials: "same-origin",
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     propData = data;
  //   })
  //   .catch(async (err) => {
  //     console.log(
  //       `there was an error, repopulating databasefor user ${decoded.email}`
  //     );
  try {
    await axios
      .get(
        // "https://api.spotify.com/v1/me/tracks?limit=50",
        // "https://api.spotify.com/v1/me/tracks?limit=50&offset=5",
        "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.items);
        const artistObject = res.data.items.map(
          ({ name, genres, images }, i) => ({
            id: i + 1,
            name,
            genres,
            images,
          })
        );
        return artistObject;
      })
      .then(async (artistObject) => {
        // console.log(artistObject);
        console.log("now in GetUsersTopArtists");
        const id = await sequelize.query(
          `SELECT id FROM hivemind.users WHERE email='${useremail}'`,
          {
            type: QueryTypes.SELECT,
          }
        );
        console.log("id", id);
        // console.log("id", id[0].id);
        // console.log(JSON.stringify(artistObject, null, 4));
        // fs.writeFile(
        //   "./test.json",
        //   JSON.stringify(artistObject, null, 4),
        //   function(err) {
        //     if (err) {
        //       return console.log(err);
        //     }

        //     console.log("The file was saved!");
        //   }
        // );
        await db.userdata.create({
          userid: id[0].id,
          topartists: JSON.stringify(artistObject),
        });
        console.log("top artists object written to db");
      })

      .catch(function (error) {
        // handle error
        console.log("error in GetUsersTopArtists.js");
      });
  } catch (e) {
    console.log(`it failed in GetUsersTopArtists.js`);
  }

  // await GetUsersTopArtists("token", "frank@gmail.com");
  // console.log(ctx.req.headers);

  // console.log(decoded.email);
  // let propData;

  // return { artistArray: propData };
  return { artistArray: ["x", "y", "z"] };

  // return "x";
};
