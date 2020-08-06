import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import japanImg from '../img/japan.png';
import greeceImg from '../img/greece.png';
import romaniaImg from '../img/romania.png';
import nzImg from '../img/newzealand.png';
import Santorini from '../img/greece-santorini.png';
import Zakynthos from '../img/greece-zakynthos.png';
import { fetchMedia, clearMedia, setDisplayFilter } from "../redux/media/mediaActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const images = [
  {
    key: 1,
    location: 'Japan',
    imgSrc: japanImg
  },
  {
    key: 2,
    location: 'Greece',
    imgSrc: greeceImg
  },
  {
    key: 3,
    location: 'Romania',
    imgSrc: romaniaImg
  },
  {
    key: 4,
    location: 'Santorini',
    imgSrc: Santorini
  },
  {
    key: 5,
    location: 'Zakynthos',
    imgSrc: Zakynthos
  },
  {
    key: 6,
    location: 'New Zealand',
    imgSrc: nzImg
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    direction: 'row',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    minWidth: 300,
    padding: 10,
    color: '#292929'
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    direction: 'row'
  },
  button: {
    marginLeft: "30%",
    margin: 10
  },
  card: {
    '&:hover': {
      opacity: 0.5
  },
  margin: 5
}
}));

const RandomDestinations = [
  "South Island",
  "Iceland",
  "Sweden",
  "Alaska",
  "Maui",
  "Malaysia",
  "Tahiti",
  "Singapore",
  "Seychelles",
  "Tanzania",
  "Scotland",
  "Mali",
  "Cairo",
  "Sudan",
  "Morocco",
  "Tunisia",
  "Colombia",
  "Chile"
];

export default function LandingPage() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();

  const handleRandom = () => {
    const randomDestination = RandomDestinations[Math.floor(Math.random() * RandomDestinations.length)];
    dispatch(setDisplayFilter('media'));
    dispatch(fetchMedia(randomDestination));
    sessionStorage.setItem('query', randomDestination);
    history.push('/results');
  }

  return (
    <div className={classes.root}>
      <div>
        <h1 className={classes.title}>Where will your next journey take you?</h1>
        <Button className={classes.button} size="small" variant="contained" color="secondary" onClick={handleRandom}>Surprise me!</Button>
      </div>
      <Grid
        container
        flexgrow={1}
        spacing={3}
        direction="row"
        justify="center"
        alignContent="center"
      >
        {images.map((image) => {
          return <Grid item xs={4} key={image.key}>
            <Card 
            className={classes.card} 
            onClick={() => {
              dispatch(clearMedia());
              dispatch(setDisplayFilter('media'));
              dispatch(fetchMedia(image.location));
              sessionStorage.setItem('query', image.location);
              history.push('/results');
            }}
            >
              <Tooltip title={image.location}>
              <CardMedia
                component="img"
                height="240px"
                image={image.imgSrc}
              />
              </Tooltip>
              {/* <CardActions>
                <Button size="small" >{image.location}</Button>
              </CardActions> */}
            </Card>
          </Grid>
        })}
      </Grid>
    </div >
  );
};
