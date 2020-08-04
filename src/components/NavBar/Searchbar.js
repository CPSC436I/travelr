import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchMedia,
  fetchPlaces,
  fetchVideos,
  fetchRestaurants,
  fetchEvents,
  setDisplayFilter,
  clearMedia,
  clearVideos,
  clearPlaces,
  clearRestaurants,
  clearEvents } from "../../redux/media/mediaActions";

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    minWidth: 90,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    display: 'row',
    margin: theme.spacing(2),
    alignItems: 'center',
  },
  paper: {
    border: 0,
    display: 'row'
  },
  button: {
    borderRadius: 4,
    position: 'relative',
    minWidth: 90,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
  }
}));

function Searchbar() {
  const classes = useStyles();
  const [location, setLocation] = React.useState('');
  const [type, setType] = React.useState('media');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (event) => {
    sessionStorage.setItem('query', location);
    sessionStorage.setItem('searchBarFilter', type);
    let query = sessionStorage.getItem('query');

    if (type === 'place') {
      dispatch(clearPlaces());
      dispatch(setDisplayFilter('place'));
      dispatch(clearMedia());
      dispatch(clearVideos());
      dispatch(clearRestaurants());
      dispatch(fetchPlaces(query));
    }
    if (type === 'media') {
      dispatch(clearMedia());
      dispatch(setDisplayFilter('media'));
      dispatch(clearVideos());
      dispatch(clearPlaces());
      dispatch(clearRestaurants());
      dispatch(fetchMedia(query));
    }
    if (type === 'video') {
      dispatch(clearVideos());
      dispatch(setDisplayFilter('video'));
      dispatch(clearMedia());
      dispatch(clearPlaces());
      dispatch(clearRestaurants());
      dispatch(fetchVideos(query));
    }
    if (type === 'restaurant') {
      dispatch(clearRestaurants());
      dispatch(setDisplayFilter('restaurant'));
      dispatch(clearMedia());
      dispatch(clearPlaces());
      dispatch(clearVideos());
      dispatch(fetchRestaurants(query));
    }
    if (type === 'event') {
      dispatch(clearEvents());
      dispatch(setDisplayFilter('event'));
      dispatch(clearMedia());
      dispatch(clearPlaces());
      dispatch(clearVideos());
      dispatch(fetchEvents(query));
    }
    event.preventDefault();
    history.push('/results')
  }

  return (
    <div>
      <Paper elevation={0}  component="form" onSubmit={handleSubmit} className={classes.paper}>
      <FormControl className={classes.margin}>
        <BootstrapInput 
          id="location-searchbar"
          placeholder="Literally anywhere"
          inputProps={{ 'aria-label': 'search' }}
          onChange={e => setLocation(e.target.value)}
          value={location}
        />
      </FormControl>
      <FormControl className={classes.margin}>
        <Select
          labelId="type-label"
          id="type-select"
          value={type}
          onChange={e => setType(e.target.value)}
          input={<BootstrapInput />}
        >
          <MenuItem value='type' disabled>
            Type
          </MenuItem>
          <MenuItem value={'media'}>Photography</MenuItem>
          <MenuItem value={'video'}>Travel Vlogs</MenuItem>
          <MenuItem value={'place'}>Attractions</MenuItem>
          <MenuItem value={'restaurant'}>Food</MenuItem>
          <MenuItem value={'event'}>Events</MenuItem>
        </Select>
      </FormControl>
      <IconButton type="submit" className={classes.margin} aria-label="search"  >
          <SearchIcon/>
        </IconButton>
        </Paper>
    </div>
  );
}

export default Searchbar;
