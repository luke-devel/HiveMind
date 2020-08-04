import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ArtistList({
  artistArray,
  removeArtist,
  reAddArtist,
  removedTab,
}) {
  const classes = useStyles();
  const artistList = artistArray.map(({ id, genres, images, name }, index) => {
    return (
      <Grid
        item
        xs={12}
        md={4}
        lg={3}
        style={{ textAlign: "center" }}
        key={index}
      >
        <Card
          className={classes.root}
          style={{
            textAlign: "center",
            padding: 10,
            borderRadius: "2%",
            border: "4px solid black",
          }}
        >
          <div>
            <img
              src={images[2].url}
              alt={name}
              width="160"
              height="160"
              style={{
                marginTop: 5,
                borderRadius: "2%",
                border: "4px solid black",
              }}
            />
            <h1 style={{ paddingTop: 5, fontSize: "70va", margin: 0 }}>
              {name}
            </h1>
            <div>
              {genres.length === 0 ? (
                <div>No genre data ;(</div>
              ) : (
                <div style={{ fontSize: 20 }}>
                  {genres.map((genre, i) => {
                    if (i === genres.length - 1) {
                      return `${genre}`;
                    } else {
                      return `${genre}, `;
                    }
                  })}
                </div>
              )}
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              {removedTab === true ? (
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#EF7B73" }}
                  onClick={() => reAddArtist(index)}
                >
                  Re-Add to Favorite Artists
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#EF7B73" }}
                  onClick={() => removeArtist(index)}
                >
                  Remove From Favorite Artists
                </Button>
              )}
            </div>
          </div>
        </Card>
      </Grid>
    );
  });
  const [rawArtistList, setRawArtistList] = useState(artistArray);
  const [loading, setLoading] = useState(true);

  return (
    <div className={classes.root} style={{ marginTop: 30, marginBottom: 30 }}>
      <Grid container spacing={5} component={"span"}>
        {artistList}
      </Grid>
    </div>
  );
}
