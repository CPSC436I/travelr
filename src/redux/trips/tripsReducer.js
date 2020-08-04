const img1 = {
  id: "_8EFj6ISA08",
  mediaType: 'media',
  urls: {
    small: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0MzAyN30"
  },
  description: "Great Wall Of China, China"
};
const img2 = {
  id: "eltps1t7gDY",
  mediaType: 'media',
  urls: {
    small: "https://images.unsplash.com/photo-1543097692-fa13c6cd8595?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0MzAyN30"
  },
  description: "woman riding on boat"
};
const tempTrip = {
  _id: "sampleID",
  name: "sampleNAME",
  numberofdays: 3,
  days: [
    {
      name: "DAY 1",
      content: [
        img1
      ]
    },
    {
      name: "DAY 2",
      content: [
        img2
      ]
    },
    {
      name: "DAY 3",
      content: [

      ]
    }
  ]
};
const emptyTrip = {
  _id: "emptyID",
  name: "emptyNAME",
  numberofdays: 1,
  days: [{name: 'DAY 1', content:[]}]
};
const initialTrips = {
  loading: false,
  trips: [tempTrip, emptyTrip],
  error: ""
};

const reorderHelper = (trips, action) => {
  const src = action.payload.source, dest = action.payload.destination, tripID = action.payload.tripID;
  const trip = trips.trips.find(obj => obj._id === tripID);
  const copyList = trip.days[src.droppableId];
  const [removed] = copyList.content.splice(src.index, 1);
  copyList.content.splice(dest.index, 0, removed);
  const tripIndex = trips.trips.findIndex(obj => obj._id === tripID);
  trips.trips[tripIndex].days[src.droppableId] = copyList;
  return trips;
};
const moveHelper = (trips, action) => {
  const src = action.payload.source, dest = action.payload.destination, tripID = action.payload.tripID;
  const trip = trips.trips.find(obj => obj._id === tripID);
  const srcClone = trip.days[src.droppableId];
  const destClone = trip.days[dest.droppableId];

  const [removed] = srcClone.content.splice(src.index, 1);
  destClone.content.splice(dest.index, 0, removed);
  const tripIndex = trips.trips.findIndex(obj => obj._id === tripID);
  trips.trips[tripIndex].days[src.droppableId] = srcClone;
  trips.trips[tripIndex].days[dest.droppableId] = destClone;
  return trips
};
const deleteHelper = (trips, action) => {
  const tripID = action.payload.tripID, listIndex = action.payload.listIndex, cardID = action.payload.cardID;
  const trip = trips.trips.find(obj => obj._id === tripID);
  console.log(trip.days);
  console.log(listIndex);
  const list = trip.days[listIndex].content;
  const index = list.map(x => {
    return x.id;
  }).indexOf(cardID);
  list.splice(index, 1);
  const tripIndex = trips.trips.findIndex(obj => obj._id === tripID);
  trips.trips[tripIndex].days[listIndex].content = list;
  return trips;
};
const addTripHelper = (trips, action) => {
  trips.trips.concat({name: action.payload.title, numberOfDays: parseInt(action.payload.days)});
  return trips;
};

const addCardsHelper = (trips, action) => {
  const tripID = action.payload.tripID, listIndex = action.payload.listIndex, selectedCards = action.payload.selectedCards;
  console.log('action ', action);
  let trip = trips.trips.find(obj => obj._id === tripID);
  console.log('trip ', trip);
  let list = trip.days[listIndex].content;
  list.push(selectedCards);
  console.log('list ', list);
  const tripIndex = trips.trips.findIndex(obj => obj._id === tripID);
  trips.trips[tripIndex].days[listIndex].content = list;
  return trips;
};

const tripsState = (trips = initialTrips, action) => {
  switch (action.type) {
    case 'ADD_TRIP_REDUX':
      let newTrips = trips.trips;
      newTrips.unshift(action.payload);
      return {
        ...trips,
        trips: newTrips,
      };
    case 'ADD_TRIP_REQUEST':
    case 'DELETE_TRIP_REQUEST':
    case 'FETCH_TRIPS_REQUEST':
    case 'UPDATE_TRIP_REQUEST':
    return {
      ...trips,
      loading: true
    };
    case 'ADD_TRIP_SUCCESS':
      return addTripHelper(trips, action);
    case 'FETCH_TRIPS_SUCCESS':
    case 'UPDATE_TRIP_SUCCESS': //TODO: assumes BE returns all trips
    case 'DELETE_TRIP_SUCCESS':
    return {
      ...trips,
      loading: false,
      trips: action.payload,
      error: ''
    };
    case 'FETCH_TRIPS_FAILURE':
    case 'UPDATE_TRIP_FAILURE':
    case 'ADD_TRIP_FAILURE':
    case 'DELETE_TRIP_FAILURE':
    return {
      ...trips,
      loading: false,
      trips: [],
      error: action.payload
    };
    case 'REORDER_CARD':
    return reorderHelper(trips, action);
    case 'MOVE_CARD':
    return moveHelper(trips, action);
    case 'DELETE_CARD':
    return deleteHelper(trips, action);
    case 'ADD_CARDS':
    return addCardsHelper(trips, action);
    default: return trips;
  };
};

export const tripsReducer = {
  trips: tripsState
};
