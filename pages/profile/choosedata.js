import Footer from "../../components/Footer";
import Profile from "../../components/Profile";
import Header from "../../components/Header";
// DataBody to be worked on soon
import DataBody from "../../components/DataBody";
import GetTopArtists from "../../components/GetTopArtists";
import fetch from "isomorphic-unfetch";
import axios from "axios";
export default function ChooseData({ data }) {
  console.log(data);

  const bodyStyle = {
    fontFamily: "sans-serif",
    margin: "0",
    display: "grid",
    gridTemplateColumns: "100%",
    gridTemplateRows: "auto 70px",
    gridTemplateAreas: `
      "main"
      "footer"`
  };

  const bodyNavigation = {
    listStyle: "none",
    margin: "0",
    padding: "0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: " center",
    height: "100%"
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
              height: "100vh"
            }}
          >
            <div></div>
            <GetTopArtists GetTopArtists={{ obj: data }} />
          </main>
          <footer
            style={{ padding: "0px", textAlign: "center", gridArea: "footer" }}
          >
            {/* <Footer /> */}
          </footer>
        </div>
      </div>
    </>
  );
}

ChooseData.getInitialProps = async context => {
  // console.log(context);
  // const artistsObj = await fetch(
  //   `http://localhost:3000/api/spotify/dataforfetch`
  // ).then(data => console.log(data));

  const artistsObj = await axios.get(
    "http://localhost:3000/api/spotify/dataforfetch"
  );

  return { data: artistsObj.data };
};
