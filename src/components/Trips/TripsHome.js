import React from 'react';
import TripsHomeItem from './TripsHomeItem';
import { connect } from 'react-redux';
import { addTrip } from '../../redux/trips/tripsActions';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import NewTripModal from './NewTripModal';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '20%',
    margin: 'auto',
  },
}));

function TripsHome(props) {
  const classes = useStyles();
  const { trips } = props;

  const renderBoards = () => {
    if (trips.loading) return <div>loading</div>;
    if (trips.error) return <div>{trips.error}</div>;
    return trips.trips.map((trip, index) => {
      const boardID = trip._id;
      return (
        <TripsHomeItem trip={trip} key={boardID} tripkey={index} />
      );
    });
  };
  return (
    <div className={classes.list}>
      <NewTripModal addTrip={props.addTrip} />
      <List>
        {renderBoards()}
      </List>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { trips: state.trips };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTrip: (tripData) => {
      dispatch(addTrip(tripData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripsHome);
