import Index from "../pages";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function Footer() {
  return (
    <Grid
      container
      spacing={0}
      style={{
        background: "#EF7B73",
        borderTop: "2px solid black",
      }}
    >
      <Grid item xs={12} style={{ padding: 0, textAlign: "center" }}>
        <Typography
          style={{
            flexGrow: 1,
            fontFamily: "Roboto",
            fontStyle: "italic",
            fontWeight: "900",
            color: "black",
            fontSize: "25px",
            margin: 10,
          }}
        >
          © 2020 - Hivemind
        </Typography>
      </Grid>
    </Grid>
  );
}
