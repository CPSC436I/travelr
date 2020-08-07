import { connect } from 'react-redux';
import React, { useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import UserProvider from '../contexts/UserProvider';
import _ from 'lodash';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { useDispatch } from "react-redux";
import Media from './Media';
import { makeStyles } from '@material-ui/core/styles';
import {
  fetchFavourites,
  fetchVideos,
  fetchPlaces,
  fetchMedia,
  fetchRestaurants,
  fetchEvents,
  fetchMoreMedia,
  fetchMoreVideos,
  fetchMorePlaces,
  fetchMoreRestaurants,
  fetchMoreEvents
} from '../redux';

let mediaIndex = 1;
let header;

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
    filteredContent = places
      .filter(place => place !== null)
      .map(place => {
        return <Grid item xs={4} key={place.photoUrl}>
          <Media
            place={place}
            query={query}
            saved={folders
              .find(folder => folder.images.find(img => img.id === place.id) !== undefined) !== undefined}
          />
        </Grid>
      })
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
    videos = videos.filter(videoId => videoId !== null);
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

function Display({ query, media, folders, fetchFavourites, videos, places, restaurants, events, searchBarFilter, videoNextPageToken, placeNextPageToken, loading }) {
  const classes = useStyles();
  const [userData] = useContext(UserProvider.context);

  useEffect(() => {
    if (query && !_.isEmpty(userData)) {
      fetchFavourites();
    }
  },[query,fetchFavourites, userData]);

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

  const pickHeader = () => {
    if (loading.isMediaLoading || loading.isVideoLoading || loading.isPlaceLoading || loading.isRestaurantLoading || loading.isEventLoading) {
      if (media.length === 0 && videos.length === 0 && places.length === 0 && restaurants.length === 0 && events.length === 0) {
        header = `Loading...`;
      }
    } else {
      if (media.length === 0 && videos.length === 0 && places.length === 0 && restaurants.length === 0 && events.length === 0) {
      header = `Oops! No results came back for ${sessionStorage.getItem('query')}. Try a different filter or destination!`;
      } else {
        header = `Showing search results for ${sessionStorage.getItem('query')} from 
        ${
          sessionStorage.getItem('searchBarFilter') === 'video' ? ' Youtube' :
          sessionStorage.getItem('searchBarFilter') === 'place' ? ' Google':
          sessionStorage.getItem('searchBarFilter') === 'restaurant' ? ' Yelp':
          sessionStorage.getItem('searchBarFilter') === 'event' ? ' Yelp':
          sessionStorage.getItem('searchBarFilter') === 'media' ? ' Unsplash': ' somewhere'
        }`;
      } 
    }
  }

  return (
    <div className={classes.root}>
      <BottomScrollListener onBottom={callback} >
      {pickHeader()}
        <h1 className={classes.title}>
          {header}
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
    placeNextPageToken: state.places.nextPageToken,
    loading: {
      isMediaLoading: state.media.loading,
      isVideoLoading: state.videos.loading,
      isPlaceLoading: state.places.loading,
      isRestaurantLoading: state.restaurants.loading,
      isEventLoading: state.events.loading 
    }
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