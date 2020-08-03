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
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchMedia, fetchPlaces, fetchVideos, setDisplayFilter } from "../../redux/media/mediaActions";
import { connect } from 'react-redux';

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
  const [type, setType] = React.useState('photos');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (event) => {
    if (type === 'attractions') {
      dispatch(setDisplayFilter('place'));
      dispatch(fetchPlaces(location));
    }
    if (type === 'photos') {
      dispatch(setDisplayFilter('media'));
      dispatch(fetchMedia(location));
    }
    if (type === 'travelvlogs') {
      dispatch(setDisplayFilter('video'));
      dispatch(fetchVideos(location));
    };

    sessionStorage.setItem('query', location);
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
          <MenuItem value={'photos'}>Photos</MenuItem>
          <MenuItem value={'travelvlogs'}>Travel vlogs</MenuItem>
          <MenuItem value={'attractions'}>Attractions</MenuItem>
          <MenuItem value={'food'}>Food</MenuItem>
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
