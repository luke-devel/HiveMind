import png from "../assets/images/HiveMind.png";
import Router from "next/router";

export default function Landing() {
  return (
    <div
      style={{
        minHeight: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#EF7B73"
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12" style={{ textAlign: "center" }}>
            {/* <h1 style={{ fontFamily: "Roboto",color: "#212529", fontWeight: "bold" }}>
              welcome to
            </h1> */}
            <h1 style={{fontFamily: "Roboto", fontSize: "75px"}}>hivemind</h1>
          </div>

          <div className="col-12" style={{ textAlign: "center", marginTop:"15px" }}>
            <button
              type="button"
              className="btn"
              onClick={() => {
                Router.push("/login");
              }}
              style={{
                backgroundColor: "#212529",
                color: "white",
                width: "80px",
                height: "45px",
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
