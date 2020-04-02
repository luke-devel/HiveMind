import Router from "next/router";
import Border from "./Border";

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
        <Border
          border={{
            title: "hivemind",
            width: "30%",
            fontSize: "70px",
            borderSize: "5px"
          }}
        />
        <div className="row">
          <div
            className="col-12"
            style={{ textAlign: "center", paddingTop: "30px" }}
          >
            <button
              type="button"
              className="btn"
              onClick={() => {
                Router.push("/login");
              }}
              style={{
                backgroundColor: "#212529",
                width: "80px",
                height: "45px",
                fontSize: "18px",
                fontWeight: "600",
                fontStyle: "italic",
                fontFamily: "roboto",
                color: "#EF7B73"
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
