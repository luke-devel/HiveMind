import Router from "next/router";
import Border from "./Border";

export default function ChooseArtists(css) {
  return (
    <div style={{}}>
      <div
        className="col-6"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          marginTop: 80,
          padding: 0
        }}
      >
        <div className="container">
          <div className="row" >
            <div className="col-12" style={{ paddingTop: 20 , width: "50%"}}>
              <Border
                border={{
                  title: "hivemind",
                  width: "30vh",
                  fontSize: "5vh",
                  borderSize: "5px"
                }}
              />
            </div>
            <div className="row">
            <div className="col-6" style={{ padding: 30, textAlign: "center" , marginLeft: -15, marginRight: 25}}>
              <a
                style={{ cursor: "pointer" }}
                onClick={() => console.log("yo")}
              >
                <Border
                  border={{
                    title: "find your top artists",
                    width: "15vh",
                    fontSize: "20px",
                    borderSize: "4px"
                  }}
                />
              </a>
            </div>
            <div className="col-6" style={{ padding: 30, textAlign: "center", paddingLeft: 15 }}>
              <Border
                border={{
                  title: "find your playlists",
                  width: "13vh",
                  fontSize: "20px",
                  borderSize: "4px"
                }}
              />
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
