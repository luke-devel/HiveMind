import Router from "next/router";
import Border from "./Border";
import ChooseArtists from "./ChooseArtists";
export default function DataBody() {
  return (
    <>
      <div
        style={{
          minHeight: "100%",
          minHeight: "100vh",
          background:
            "linear-gradient(#212529, #212529) no-repeat center/5px 100%",
          backgroundColor: "#EF7B73",
          paddingTop: 15,
          textAlign: "center",
          border: "5px solid #212529",
          borderTopWidth: 0
        }}
      >
        <div
          className="container"
          style={{ margin: 0, position: "absolute", left: "0px", width: "50%" }}
        >
          <div className="row" style={{ margin: 0 }}>
       
              <ChooseArtists css={{marginTop: "60px", padding: "0px"}}/>
            
            <div
              className="col-6"
              style={{
                position: "absolute",
                top: "50%",
                right: "-50%",
                transform: "translate(50%, 50%)",
                width: "100%",
                padding: "0px",
                height: "10vh",
                marginTop:"-20px"
              }}
            >
              <h1>placeholder</h1>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
  S;
}
