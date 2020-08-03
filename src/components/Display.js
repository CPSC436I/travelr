import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Media from './Media';
import { fetchFavourites, fetchVideos, fetchPlaces, fetchMedia } from '../redux';
// import getPlaceDetails from '../../api/routes/places';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { session } from 'passport';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto'
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    direction: 'row'
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    minWidth: 300,
    padding: 10,
    color: 'grey',
    margin: theme.spacing(1)
  }
}));

function mergeMediaAndVideos (query, media, folders, videos, places, searchBarFilter) {
  let filteredContent;
  if (searchBarFilter.showPlaces) {
    filteredContent = places.map((place) => {
      if (place !== null) {
        return <Grid item xs={4} key={place.photoUrl}>
          <Media
            place={place}
            query={query}
            saved={folders
              .find(folder => folder.images.find(img => img.id === place.id) !== undefined) !== undefined}
          />
        </Grid>;
      }
    });
  }
  if (searchBarFilter.showMedia) {
    filteredContent = media.map((imgInState) => {
      return <Grid item xs={4} key={imgInState.id}>
        <Media
          media={imgInState}
          query={query}
          saved={folders
            .find(folder => folder.images.find(img => img.id === imgInState.id) !== undefined) !== undefined}
        />
      </Grid>;
    });
  }
  if (searchBarFilter.showVideos) {
    filteredContent = videos.map((videoId) => {
      return <Grid item xs={6} key={videoId}>
        <Media
          video={videoId}
          query={query}
          saved={folders
            .find(folder => folder.images.find(img => img.id === videoId) !== undefined) !== undefined} />
      </Grid>;
    });
  }
  return filteredContent;
}


function Display ({ query, media, folders, fetchFavourites, videos, places , fetchMedia, fetchVideos, fetchPlaces, searchBarFilter }) {
  const classes = useStyles();

  useEffect(() => {
    query = sessionStorage.getItem('query');
    console.log(query);
    if (query) {
      fetchMedia(query);
      fetchVideos(query);
      fetchPlaces(query);
      fetchFavourites();
    }
  }, []);

  return (
    <div className={classes.root}>
    <h1 className={classes.title}>
    Showing search results for {sessionStorage.getItem('query')}
    </h1>
    <Grid
      container
      flexgrow={1}
      spacing={3}
      direction='row'
      justify='center'
      alignContent='center'
    >
      {media.length === 0 && videos.length === 0 && places.length === 0 ? (
        null
      ) : mergeMediaAndVideos(query, media, folders, videos, places, searchBarFilter)
      }
    </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    query: state.media.query,
    media: state.media.results,
    folders: state.folders.folders,
    videos: state.videos.ids,
    places: state.places.places,
    searchBarFilter: state.searchBarFilter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFavourites: () => {
      dispatch(fetchFavourites());
    },
    fetchMedia: (location) => {
      console.log('fetching media');
      dispatch(fetchMedia(location));
    },
    fetchVideos: (location) => {
      dispatch(fetchVideos(location));
    },
    fetchPlaces: (location) => {
      dispatch(fetchPlaces(location));
    }
  };
};

const DisplayContainer = connect(mapStateToProps, mapDispatchToProps)(Display);

export default DisplayContainer;
