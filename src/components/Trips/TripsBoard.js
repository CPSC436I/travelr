import React, { useEffect, useState } from "react";
import BoardList from "./BoardList";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { DragDropContext } from "react-beautiful-dnd";
import { makeStyles } from '@material-ui/core/styles';
import { updateTrip, reorderCard, moveCard, deleteCard, addCards } from '../../redux/trips/tripsActions';

const useStyles = makeStyles((theme) => ({
  DaysContainer: {
    display: 'flex',
    'flex-direction': 'row',
  }
}));

const tempTrip = {
  _id: "_bruh",
  name: "bruh",
  numberofdays: 0,
  days: []
};
const useForceUpdate = () => useState()[1];

function TripsBoard (props) {
  const classes = useStyles();
  const { tripID } = useParams();
  const { trips } = props;
  const [trip, setTrip] = useState(tempTrip);
  const forceUpdate = useForceUpdate();

  useEffect(()=>{
    let findTrip = trips.trips.find(trip => trip._id === tripID);
    if (findTrip) setTrip(findTrip);
  }, [trips, trip]);

  const onDragEnd = result => {
    const { destination, source } = result;
    console.log(result);
    if (!destination) return; // dropped outside of board 
    const srceListID = source.droppableId;
    const destListID = destination.droppableId;
    if (srceListID === destListID) { //within the same list
      props.reorderCard(tripID, source, destination);
    } else {
      props.moveCard(tripID, source, destination);
    }
    // props.updateTrip(trip);
  };

  const handleDeleteCard = (tripID, listIndex, cardID) => {
    setTrip(props.deleteCard(tripID, listIndex, cardID));
  };
  const handleAddCards = (selectedCards, tripID, listIndex) => {
    setTrip(props.addCards(selectedCards, tripID, listIndex));
    forceUpdate();
  }

  const mapTripDays = () => {
    if (trip.days) {
      return trip.days.map((day, index) => {
        return (
          <BoardList trip={trip} day={day} index={index} key={tripID +"list"+ index} deleteCard={handleDeleteCard} addCards={handleAddCards}/>
        );
      });
    }
    return (<div>trip days not found</div>);
  };

  return (
    <div>
    {trip ? <div>TripID from url: {tripID} <br/>
    mongo: name {trip.name}, id {trip._id}, days {trip.numberofdays}<br/>
    <div className={classes.DaysContainer}>
    <DragDropContext onDragEnd={onDragEnd}>
    {mapTripDays()}
    </DragDropContext>
    </div> </div>: "undefined"}

    </div>
  );
  return (
    <div>
    {trip ? "found" : "undefined"}
    TripID from url: {tripID} <br/>
    mongo: name {trip.name}, id {trip._id}, days {trip.numberofdays}<br/>
    <div className={classes.DaysContainer}>
    <DragDropContext onDragEnd={onDragEnd}>
    {mapTripDays()}
    </DragDropContext>
    </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    trips: state.trips,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTrip: (trip) => {
      dispatch(updateTrip(trip));
    },
    reorderCard: (tripID, source, destination) => {
      dispatch(reorderCard(tripID, source, destination));
    },
    moveCard: (tripID, source, destination) => {
      dispatch(moveCard(tripID, source, destination));
    },
    deleteCard: (tripID, listIndex, cardID) => {
      dispatch(deleteCard(tripID, listIndex, cardID));
    },
    addCards: (selectedCards, tripID, listIndex) => {
      dispatch(addCards(selectedCards, tripID, listIndex));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripsBoard);
