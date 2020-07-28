import { connect } from 'react-redux';
import React, { useEffect, } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Media from './Media'
import { fetchFavourites } from '../redux';

const styles = makeStyles => ({
  root: {
    maxWidth: 400,
    margin: 'auto'
  },
  title: {
    fontSize: 14,
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    direction: 'row',
  }
});

function mergeMediaAndVideos (query, media, folders, videos) {
  let mediaContent = media.map((imgInState) => {
    return <Grid item xs={4} key={imgInState.id}>
      <Media 
        media={imgInState} 
        query={query} 
        saved={folders
          .find(folder => folder.images.find(img => img.id === imgInState.id) !== undefined) !== undefined}
      />
    </Grid>;
  });
  let videoContent = videos.map((videoId) => {
    return <Grid item xs={6} key={videoId}>
    <iframe id="ytplayer" type="text/html" width="540" height="360"
         src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`}
         frameBorder="0"></iframe>
    </Grid>
  });
  let allContent = mediaContent.concat(videoContent);
  return allContent;
}

function Display({ query, media, folders, fetchFavourites, videos }) {

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <Grid
      container
      flexgrow={1}
      spacing={3}
      direction="row"
      justify="center"
      alignContent="center"
    >
      {media.length === 0 ? (
        null
      ) : mergeMediaAndVideos(query, media, folders, videos)
      }
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    query: state.media.query,
    media: state.media.results,
    folders: state.folders.folders,
    videos: state.videos.ids
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFavourites: () => {
      dispatch(fetchFavourites());
    }
  }
}

const DisplayContainer = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Display));

export default DisplayContainer;
