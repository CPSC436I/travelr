import { toJson } from 'unsplash-js';

const TRAVELR_API = 'http://localhost:9000';
const TRIPS_URL = `${TRAVELR_API}/trips`;

const addTripRequest = () => {
  return {
    type: 'ADD_TRIP_REQUEST'
  };
};
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
export const addTrip = input => {
  return (dispatch) => {
    dispatch(addTripRequest);
    fetch(TRIPS_URL, { method: 'POST', body: JSON.stringify(input) })
    .then(toJson)
    .then(json => {
      dispatch(addTripSuccess(json));
    })
    .catch(error => {
      dispatch(addTripFailure(error.message));
    });
  };
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
    });
  };
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
