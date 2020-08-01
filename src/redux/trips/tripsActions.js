import {
  FETCH_TRIPS_REQUEST,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_FAILURE,
  SAVE_TRIPS_REQUEST,
  SAVE_TRIPS_SUCCESS,
  SAVE_TRIPS_FAILURE,
} from './tripsTypes.js';
import axios from 'axios';
const TRAVELR_API = process.env.REACT_APP_API_URI;
const TRIPS_URL = `${TRAVELR_API}/trips`;

axios.defaults.withCredentials = true;

export const addTrip = input => {
  return {
    type: 'ADD_TRIP',
    title: input.tripName,
    days: input.numberOfDays
  };
};

export const deleteTrip = text => {
  return {
    type: 'DELETE_TRIP',
    title: text
  };
};

export const saveTrip = (tripInfo) => {
  return (dispatch) => {
    dispatch(saveTripRequest);
    console.log(JSON.stringify(tripInfo));
    let config = {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      withCredentials: true
  }
  axios.post(TRIPS_URL, {...tripInfo}, config)
                .then(res => {
                    dispatch(saveTripSuccess(tripInfo));
                })
                .catch(error => {
                    dispatch(saveTripFailure(error));
                });
  }
}

const saveTripRequest = () => {
  return {
      type: SAVE_TRIPS_REQUEST
  }
}

const saveTripSuccess = (trips) => {
  return {
      type: SAVE_TRIPS_SUCCESS,
      payload: trips
  }
}

const saveTripFailure = (error) => {
  return {
      type: SAVE_TRIPS_FAILURE,
      payload: error
  }
}

export const fetchTrips = () => {
  return (dispatch) => {
      dispatch(fetchTripRequest);
      axios({
          url: TRIPS_URL,
          method: 'GET',
          withCredentials: true
      })
          .then(json => {
              dispatch(fetchTripSuccess(json.data));
          })
          .catch(error => {
              dispatch(fetchTripFailure(error.message));
          });
  }
}

const fetchTripRequest = () => {
  return {
      type: FETCH_TRIPS_REQUEST
  }
}

const fetchTripSuccess = (trips) => {
  return {
      type: FETCH_TRIPS_SUCCESS,
      payload: trips
  }
}

const fetchTripFailure = (error) => {
  return {
      type: FETCH_TRIPS_FAILURE,
      payload: error
  }
}