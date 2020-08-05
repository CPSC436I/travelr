import { v4 as uuidv4 } from 'uuid';

const addTripRedux = (trip) => {
  return {
    type: 'ADD_TRIP_REDUX',
    payload: trip
  };
};
export const addTrip = input => {
  const tripID = uuidv4();
  let days = [];
  for (let i = 1; i <= input.numberOfDays; i++) {
    days.push({
      name: "DAY " + i,
      content: []
    });
  }
  const trip = {
    _id: tripID,
    name: input.tripName,
    numberofdays: input.numberOfDays,
    days: days
  };
  return (dispatch) => {
    dispatch(addTripRedux(trip));
  };
};

export const reorderCard = (tripID, source, destination) => {
  return (dispatch) => {
    dispatch({
      type: 'REORDER_CARD',
      payload: {
        tripID,
        source,
        destination
      }
    });
  };
};
export const moveCard = (tripID, source, destination) => {
  return (dispatch) => {
    dispatch({
      type: 'MOVE_CARD',
      payload: {
        tripID,
        source,
        destination
      }
    });
  };
};
export const deleteCard = (tripID, listIndex, cardID) => {
  return (dispatch) => {
    dispatch({
      type: 'DELETE_CARD',
      payload: {
        tripID,
        listIndex,
        cardID
      }
    });
  };
};
export const addCards = (selectedCards, tripID, listIndex) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_CARDS',
      payload: {selectedCards, tripID, listIndex}
    });
  };
};
