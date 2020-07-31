import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { fetchFavourites } from '../../redux/'
import Media from '../Media'

import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import japanImg from '../../img/japan.png';
import greeceImg from '../../img/greece.png';
import romaniaImg from '../../img/romania.png';
import nzImg from '../../img/newzealand.png';
import Santorini from '../../img/greece-santorini.png';
import Zakynthos from '../../img/greece-zakynthos.png';

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
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  content: {
    "flex-grow": 4
  },
  sidebar: {
    "flex-grow": 1
  },
  container: {
    display: 'flex'
  }
}));

function AddFavouriteModal({ folders, fetchFavourites }) {

  const classes = useStyles();
  const [selectedFilters, setFilters] = React.useState([]);
  const [selectedFavourites, setFavourites] = React.useState([]);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const handleChange = (event) => {
    if (event.target.checked) {
      selectedFilters.push(event.target.name);
    } else {
      const index = selectedFilters.indexOf(event.target.name);
      selectedFilters.splice(index, 1);
    }
    setFilters([...selectedFilters]);

    console.log(selectedFilters);
  };
  // console.log(folders.folders === undefined ? "nothing" : folders.folders[0])

  return (
    <div className={classes.container}>
      <div>
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
            <Card>
              <CardMedia
                component="img"
                height="240"
                image={image.imgSrc}
                title={image.location}
              />
              <CardActions>
              <Checkbox checked={selectedFilters.includes(image.location)} onChange={handleChange} name={image.location} />
                <Button size="small" >{image.location}</Button>
              </CardActions>
            </Card>
          </Grid>
        })}
      </Grid>
    </div >
      <div className={classes.sidebar}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Filters</FormLabel>
          <FormGroup>
            {
              folders.filters.sort().map(filter => {
                const name = filter.charAt(0).toUpperCase() + filter.slice(1);
                return <FormControlLabel
                  control={<Checkbox checked={selectedFilters.includes(filter)} onChange={handleChange} name={filter} />}
                  label={name}
                />
              })
            }
          </FormGroup>
        </FormControl>
      </div>
      <div className={classes.content}>
        <Grid
          container
          flexgrow={1}
          spacing={3}
          direction="row"
          justify="center"
          alignContent="center"
        >
          {folders.folders.length === 0 ? (
            null
          ) :
            folders.folders[0].images.
              filter(image => {
                if (selectedFilters.length === 0) return true;
                const intersection = Object.values(image.tags).filter(tag => {
                  return selectedFilters.includes(tag.title);
                });
                return intersection.length > 0;
              }).
              map((imgInState) => {
                console.log(imgInState)
                return <Grid item xs={4} key={imgInState.id}>
                  <Media
                    media={imgInState}
                    saved={folders.folders
                      .find(folder => folder.images.find(img => img.id === imgInState.id) !== undefined) !== undefined}
                  />
                </Grid>
              })}
        </Grid>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    folders: state.folders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFavourites: () => {
      dispatch(fetchFavourites());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFavouriteModal);