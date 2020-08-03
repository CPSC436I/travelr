import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { useDispatch } from "react-redux";
import Media from './Media';
import { fetchFavourites,
  fetchVideos,
  fetchPlaces,
  fetchMedia,
  fetchMoreMedia,
  fetchMoreVideos,
  fetchMorePlaces } from '../redux';

let mediaIndex = 1;

const styles = makeStyles => ({
  root: {
    maxWidth: 400,
    margin: 'auto'
  },
  title: {
    fontSize: 14
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    direction: 'row'
  }
});

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

function Display ({ query, media, folders, fetchFavourites, videos, places, searchBarFilter, videoNextPageToken, placeNextPageToken }) {
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
    }
  };

  return (
    <BottomScrollListener onBottom={callback} >
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
    </BottomScrollListener>
  );
}

const mapStateToProps = (state) => {
  return {
    query: state.media.query,
    media: state.media.results,
    folders: state.folders.folders,
    videos: state.videos.ids,
    places: state.places.places,
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
    }
  };
};

const DisplayContainer = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Display));

export default DisplayContainer;
