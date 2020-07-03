import Footer from "../../components/Footer";
import Profile from "../../components/Profile";
import Header from "../../components/Header";
// DataBody to be worked on soon
import DataBody from "../../components/DataBody";
import GetTopArtists from "../../components/GetTopArtists";
import GetUsersTopArtists from "../../js/GetUsersTopArtists";
import fetch from "isomorphic-unfetch";
import axios from "axios";
import jwt_decode from "jwt-decode";
const { QueryTypes, Sequelize } = require("sequelize");

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
  await GetUsersTopArtists("token", "frank@gmail.com");
  // console.log(ctx.req.headers);
  const token = ctx.req.headers.cookie.slice(6);
  const decoded = await jwt_decode(token);
  console.log(decoded.email);
  let propData;
  await fetch("http://localhost:3000/api/spotify/dataforfetch", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      useremail: decoded.email,
    },
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((data) => {
      propData = data;
    })
    .catch((err) => console.log(err));
  return { artistArray: propData };
};
