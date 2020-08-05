import Router from "next/router";
import Border from "./Border";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function Landing() {
  return (
    <div
      style={{
        backgroundColor: "#EF7B73",
        height: "87vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#EF7B73",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
        }}
      >
        <div>
          <Typography
            style={{
              flexGrow: 1,
              fontFamily: "Roboto",
              fontStyle: "italic",
              fontWeight: "900",
              color: "black",
              fontSize: "7vh",
            }}
          >
            Hivemind
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: "black",
              color: "white",
              marginTop: 10,
              fontSize: 20,
            }}
            href="login"
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}
