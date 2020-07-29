import React, {useEffect} from 'react';
import TripsListItem from './TripsListItem';
import { connect } from 'react-redux';
import { addTrip, deleteTrip } from '../../redux/trips/tripsActions';
import { makeStyles } from '@material-ui/core/styles';
import {
  List, ListItem
} from '@material-ui/core';
import NewTripModal from './NewTripModal';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '30%', // Fix IE 11 issue.
    margin: 'auto'
  }
}));

function TripsList({trips}){
  const classes = useStyles();

  return (
    <div className={classes.list}>
    <NewTripModal/>
    <List>
    {trips.slice(0).reverse().map((trip, index) => React.cloneElement(TripsListItem(trip, index, deleteTrip)))}
    </List>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log('this is state', state.trips)
  return { trips: state.trips };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTrip: (tripTitle) => {
          dispatch(deleteTrip(tripTitle));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TripsList);
