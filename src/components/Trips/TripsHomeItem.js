import React from 'react';
import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper
} from '@material-ui/core';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    float: 'left',
    display: 'inline'
  },
  text: {
    display: 'inline',
  },
  avatar: {
    backgroundColor: '#50a2a7',
  },
  link: {
    textDecoration: "none",
    color:"inherit"
  },
  listitem: {
    width: '100%'
  }
}));

function TripsHomeItem(props) {
  const {trip} = props;
  const classes = useStyles();
  const daytext = trip.numberofdays > 1 ? " days" : " day";

  return (
    <ListItem>
    <Paper elevation={3} className={classes.listitem}>
    <Link
      key={trip._id}
      to={`/trips/${trip._id}`}
      className={classes.link}
    >
      <ListItemAvatar className={classes.icon}>
        <Avatar className={classes.avatar}>
          <FlightTakeoffIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={trip.name}
        secondary={trip.numberofdays + daytext}
        className={classes.text}
      />
      </Link>
      </Paper>
    </ListItem>
  );
}

export default connect()(TripsHomeItem);
