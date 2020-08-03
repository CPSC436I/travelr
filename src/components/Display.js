import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { useDispatch } from "react-redux";
import Media from './Media';
<<<<<<< HEAD
import { fetchFavourites, fetchVideos, fetchPlaces, fetchMedia } from '../redux';
// import getPlaceDetails from '../../api/routes/places';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { session } from 'passport';
import { makeStyles } from '@material-ui/core/styles';
=======
import { fetchFavourites,
  fetchVideos,
  fetchPlaces,
  fetchMedia,
  fetchRestaurants,
  fetchEvents,
  fetchMoreMedia,
  fetchMoreVideos,
  fetchMorePlaces,
  fetchMoreRestaurants,
  fetchMoreEvents } from '../redux';

let mediaIndex = 1;
>>>>>>> eac320478d5f1f50542d4a60e522e4d961c3a24f

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

function mergeMediaAndVideos(query, media, folders, videos, places, restaurants, events, searchBarFilter) {
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
  if (searchBarFilter.showRestaurants) {
    filteredContent = restaurants.map((restaurantObj) => {
      return <Grid item xs={4} key={restaurantObj.id}>
        <Media
          restaurant={restaurantObj}
          query={query}
          saved={folders
            .find(folder => folder.images.find(img => img.id === restaurantObj.id) !== undefined) !== undefined} />
      </Grid>;
    });
  }
  if (searchBarFilter.showEvents) {
    filteredContent = events.map((eventObj) => {
      return <Grid item xs={4} key={eventObj.id}>
        <Media
          event={eventObj}
          query={query}
          saved={folders
            .find(folder => folder.images.find(img => img.id === eventObj.id) !== undefined) !== undefined} />
      </Grid>;
    });
  }
  return filteredContent;
}

function Display({ query, media, folders, fetchFavourites, videos, places, restaurants, events, searchBarFilter, videoNextPageToken, placeNextPageToken }) {
  useEffect(() => {
    query = sessionStorage.getItem('query');
    if (query) {
      fetchFavourites();
    }
  }, []);

  const dispatch = useDispatch();

  const callback = () => {
    query = sessionStorage.getItem('query');
    searchBarFilter = sessionStorage.getItem('searchBarFilter');
    if (searchBarFilter === 'media') {
      mediaIndex = mediaIndex + 1;
      dispatch(fetchMoreMedia(query, mediaIndex));
    } else if (searchBarFilter === 'video') {
      dispatch(fetchMoreVideos(query, videoNextPageToken));
    } else if (searchBarFilter === 'place') {
      dispatch(fetchMorePlaces(query, placeNextPageToken));
    } else if (searchBarFilter === 'restaurant') {
      dispatch(fetchMoreRestaurants(query));
    } else if (searchBarFilter === 'event') {
      dispatch(fetchMoreEvents(query));
    }
  };

  return (
    <div>
      <BottomScrollListener onBottom={callback} >
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
          {media.length === 0 && videos.length === 0 && places.length === 0 && restaurants.length === 0 && events.length === 0 ? (
            null
          ) : mergeMediaAndVideos(query, media, folders, videos, places, restaurants, events, searchBarFilter)
          }
        </Grid>
      </BottomScrollListener>
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
    restaurants: state.restaurants.restaurants,
    events: state.events.events,
    searchBarFilter: state.searchBarFilter,
    videoNextPageToken: state.videos.nextPageToken,
    placeNextPageToken: state.places.nextPageToken
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFavourites: () => {
      dispatch(fetchFavourites());
    },
    fetchMedia: (location) => {
      dispatch(fetchMedia(location));
    },
    fetchVideos: (location) => {
      dispatch(fetchVideos(location));
    },
    fetchPlaces: (location) => {
      dispatch(fetchPlaces(location));
    },
    fetchRestaurants: (location) => {
      dispatch(fetchRestaurants(location));
    },
    fetchEvents: (location) => {
      dispatch(fetchEvents(location));
    }
  };
};

const DisplayContainer = connect(mapStateToProps, mapDispatchToProps)(Display);

export default DisplayContainer;
