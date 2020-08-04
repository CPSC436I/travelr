import { toJson } from 'unsplash-js';
import { v4 as uuidv4 } from 'uuid';
const TRAVELR_API = 'http://localhost:9000';
const TRIPS_URL = `${TRAVELR_API}/trips`;

// export const addTrip = input => {
//   return {
//     type: 'ADD_TRIP',
//     title: input.tripName,
//     days: input.numberOfDays
//   };
// };
const addTripRequest = () => {
  return {
    type: 'ADD_TRIP_REQUEST'
  };
};
// title: input.tripName,
// days: input.numberOfDays
// const addTripRequest = (input) => {
//   return {
//     type: 'ADD_TRIP_REQUEST',
//     payload: input
//   };
// };
const addTripSuccess = (content) => {
  return {
    type: 'ADD_TRIP_SUCCESS',
    payload: content
  };
};
const addTripFailure = (error) => {
  return {
    type: 'ADD_TRIP_FAILURE',
    payload: error
  };
};
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
  // return (dispatch) => {
  //   dispatch(addTripRequest);
  //   fetch(TRIPS_URL, { method: 'POST', body: JSON.stringify(trip) })
  //   .then(toJson)
  //   .then(json => {
  //     dispatch(addTripSuccess(json));
  //   })
  //   .catch(error => {
  //     dispatch(addTripFailure(error.message));
  //   });
  // };
};

const fetchTripsRequest = () => {
  return {
    type: 'FETCH_TRIPS_REQUEST'
  };
};
const fetchTripsSuccess = (content) => {
  return {
    type: 'FETCH_TRIPS_SUCCESS',
    payload: content
  };
};
const fetchTripsFailure = (error) => {
  return {
    type: 'FETCH_TRIPS_FAILURE',
    payload: error
  };
};
export const fetchTrips = () => {
  return (dispatch) => {
    dispatch(fetchTripsRequest);
    fetch(TRIPS_URL, { method: 'GET' })
    .then(toJson)
    .then(json => {
      dispatch(fetchTripsSuccess(json));
    })
    .catch(error => {
      dispatch(fetchTripsFailure(error.message));
    });
  };
};

const updateTripRequest = () => {
  return {
    type: 'UPDATE_TRIP_REQUEST'
  };
}
const updateTripSuccess = (content) => {
  return {
    type: 'UPDATE_TRIP_SUCCESS',
    payload: content
  };
};
const updateTripFailure = (error) => {
  return {
    type: 'UPDATE_TRIP_FAILURE',
    payload: error
  };
};
//TODO: how to identify which trip to update, FE or BE
export const updateTrip = (trip) => {
  return (dispatch) => {
    dispatch(updateTripRequest());
    fetch(TRIPS_URL, {method: 'PUT', body: JSON.stringify(trip)})
    .then(res => {
      dispatch(updateTripSuccess(trip));
    })
    .catch(err => {
      dispatch(updateTripFailure(err));
    });  };
  };

  const deleteTripRequest = () => {
    return {
      type: 'DELETE_TRIP_REQUEST'
    };
  };
  const deleteTripSuccess = (content) => {
    return {
      type: 'DELETE_TRIP_SUCCESS',
      payload: content
    };
  };
  const deleteTripFailure = (error) => {
    return {
      type: 'DELETE_TRIP_FAILURE',
      payload: error
    };
  };
  export const deleteTrip = trip => {
    return (dispatch) => {
      dispatch(deleteTripRequest);
      fetch(TRIPS_URL, { method: 'DELETE', body: JSON.stringify(trip) })
      .then(toJson)
      .then(json => {
        dispatch(deleteTripSuccess(json));
      })
      .catch(error => {
        dispatch(deleteTripFailure(error.message));
      });
    }
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
  }
  export const addCards = (selectedCards, tripID, listIndex) => {
    return (dispatch) => {
      dispatch({
        type: 'ADD_CARDS',
        payload: {selectedCards, tripID, listIndex}
      });
    }
  }

  // export const deleteTrip = text => {
  //   return {
  //     type: 'DELETE_TRIP',
  //     title: text
  //   };
  // };
