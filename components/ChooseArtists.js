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
          marginTop: 50,
          padding: 0
        }}
      >
        <div className="container">
          <div className="row">
            <div
              className="col-12"
              style={{ padding: 0 }}
            >
              <Border
                border={{
                  title: "hivemind",
                  width: "30vh",
                  fontSize: "5vh",
                  borderSize: "5px"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
