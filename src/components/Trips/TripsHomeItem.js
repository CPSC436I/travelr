import React from 'react';
import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Avatar
} from '@material-ui/core';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { deleteTrip } from '../../redux/trips/tripsActions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    float: 'left',
    display: 'inline'
  },
  text: {
    float: 'right',
    display: 'inline'
  },
  avatar: {
    backgroundColor: '#50a2a7',
  }
}));

function TripsHomeItem(props) {
  const {trip, tripkey} = props;
  const classes = useStyles();

  const handleDelete = (title) => {
    props.deleteTrip(title);
  }

  return (
    <ListItem>
    <Link
      key={trip._id}
      to={`/trips/${trip._id}`}
      style={{ textDecoration: "none", color:"inherit" }}
    >
      <ListItemAvatar className={classes.icon}>
        <Avatar className={classes.avatar}>
          <FlightTakeoffIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={trip.name}
        secondary={trip.numberofdays + " days"}
        className={classes.text}
      />
      </Link>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(tripkey)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTrip: (tripTitle) => {
          dispatch(deleteTrip(tripTitle));
        }
    }
};

export default connect(null, mapDispatchToProps)(TripsHomeItem);
