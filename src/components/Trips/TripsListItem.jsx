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
import { deleteTrip } from '../../redux/trips/tripsActions'



export default function TripsListItem(trip, index, del) {

  const handleDelete = (title) => {
    console.log(title);
    del(title);
  }

  return (
    <ListItem key={index}>
    <Link to="/sampleTrip">
      <ListItemAvatar>
        <Avatar>
          <FlightTakeoffIcon />
        </Avatar>
      </ListItemAvatar>
      </Link>
      <ListItemText
        primary={trip.title}
        secondary={trip.days + " days"}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(trip.title)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

// const mapDispatchToProps = (dispatch) => {
//   return null;
//     return {
//         // deleteTrip: (tripTitle) => {
//         //   dispatch(deleteTrip(tripTitle));
//         // }
//     }
// };
//
// export default connect(null, mapDispatchToProps)(TripsListItem);
