import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ArtistList({ artistArray }) {
  const classes = useStyles();
  const artistList = artistArray.map(({ id, genres, images, name }, index) => {
    return (
      <Grid item xs={3} key={index}>
        <Card className={classes.root} style={{textAlign: "center", padding: 10}}>
          <p style={{textAlign: 'left'}}>{`#${id}.`}</p>
          <img src={images[2].url} alt={name} width='160' height='160' />
          <h1 style={{paddingTop: 5, fontSize: '70va'}}>{name}</h1>
          <p style={{fontSize: 20}}>{genres.map((genre, i)=>{
            if(i===genres.length-1){
              return `${genre}`
            }
            else{
              return`${genre}, `
            }
        })}</p>
          <div style={{paddingTop: 0, paddingBottom: 10}}>
            <Button variant="contained">Remove From Favorite Artists</Button>
          </div>
        </Card>
      </Grid>
    );
  });
  const [rawArtistList, setRawArtistList] = useState(artistArray);
  const [loading, setLoading] = useState(true);

  return (
    <div className={classes.root} style={{marginTop: 30, marginBottom: 30}}>
      <Grid container spacing={10}>
        {artistList}
      </Grid>
    </div>
  );
}
