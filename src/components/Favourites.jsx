import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { fetchFavourites } from '../redux';
import Media from './Media';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing(3)
  },
  content: {
    'flex-grow': 4
  },
  sidebar: {
    'flex-grow': 1
  },
  container: {
    display: 'flex'
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    padding: 15,
    color: 'gray'
  },
}));

function Favourites({ folders, fetchFavourites }) {
  const classes = useStyles();
  const [selectedFilters, setFilters] = React.useState([]);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  const handleChange = (event) => {
    if (event.target.checked) {
      selectedFilters.push(event.target.name);
    } else {
      const index = selectedFilters.indexOf(event.target.name);
      selectedFilters.splice(index, 1);
    }
    setFilters([...selectedFilters]);
  };

  return (
    <div className={classes.container}>

      <div className={classes.sidebar}>
        <FormControl component='fieldset' className={classes.formControl}>
          <FormLabel component='legend'>Filters</FormLabel>
          <FormGroup>
            {
              folders.filters.map(filter => {
                return filter.charAt(0).toUpperCase() + filter.slice(1);
              }).sort().map(filter => {
                return <FormControlLabel
                  control={<Checkbox 
                    checked={selectedFilters.map(filter => {
                      return filter.charAt(0).toUpperCase() + filter.slice(1);
                    }).includes(filter)} 
                    onChange={handleChange} 
                    name={filter} 
                    />}
                  label={filter}
                  key={filter}
                />;
              })
            }
          </FormGroup>
        </FormControl>
      </div>
      <div className={classes.content}>
        {folders.folders.length === 0 ? (
          <h1 className={classes.title}>You haven't liked anything yet</h1>
          )
          : (
            <div>
            <h1 className={classes.title}>See what you've liked before</h1>
            <Grid
              container
              flexgrow={1}
              spacing={3}
              direction='row'
              justify='center'
              alignContent='center'
              >
              {
                folders.folders[0].images
                .filter(image => {
                  if (selectedFilters.length === 0) return true;
                  const intersection = Object.values(image.tags).filter(tag => {
                    return selectedFilters.includes(tag);
                  });
                  return intersection.length > 0;
                })
                .map((imgInState) => {
                  if (imgInState.mediaType === 'video') {
                      return <Grid item xs={4} key={imgInState.id}>
                        <Media
                          video={imgInState.id}
                          saved={folders.folders
                            .find(folder => folder.images.find(img => img.id === imgInState.id) !== undefined) !== undefined} />
                      </Grid>;
                    } else if (imgInState.mediaType === 'place') {
                      return <Grid item xs={4} key={imgInState.id}>
                        <Media
                          place={imgInState}
                          saved={folders.folders
                            .find(folder => folder.images.find(img => img.id === imgInState.id) !== undefined) !== undefined}
                            />
                      </Grid>;
                    } else if (imgInState.mediaType === 'media') {
                      return <Grid item xs={4} key={imgInState.id}>
                        <Media
                          media={imgInState}
                          saved={folders.folders
                            .find(folder => folder.images.find(img => img.id === imgInState.id) !== undefined) !== undefined}
                            />
                      </Grid>;
                    } else if (imgInState.mediaType === 'restaurant') {
                      return <Grid item xs={4} key={imgInState.id}>
                        <Media
                          restaurant={imgInState}
                          saved={folders.folders
                            .find(folder => folder.images.find(img => img.id === imgInState.id) !== undefined) !== undefined}
                            />
                      </Grid>;
                    } else if (imgInState.mediaType === 'event') {
                      return <Grid item xs={4} key={imgInState.id}>
                        <Media
                          event={imgInState}
                          saved={folders.folders
                            .find(folder => folder.images.find(img => img.id === imgInState.id) !== undefined) !== undefined}
                            />
                      </Grid>;
                    } else {
                      return null;
                    }
                  })}
            </Grid>
        </div>
          )

        }
      </div>
    </div>
    );
}

const mapStateToProps = (state) => {
  return {
    folders: state.folders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFavourites: () => {
      dispatch(fetchFavourites());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
